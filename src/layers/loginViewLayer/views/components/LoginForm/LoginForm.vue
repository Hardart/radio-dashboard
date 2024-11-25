<script setup lang="ts">
import { computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/useAuthStore'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import {
  userLoginSchema,
  type UserLoginForm,
} from '@/shared/schemes/user-schema'
const { errors, getZodErrors } = useFormValidation()
const authStore = useAuthStore()
const { isAuth } = storeToRefs(authStore)
const router = useRouter()

const userData = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {
  await getZodErrors(userData, userLoginSchema)
  if (errors.value.length) {
    errors.value.forEach((err) => {
      const key = err.path as keyof UserLoginForm

      userData[key] = err.message
    })
    return
  }
  await authStore.login(userData)
  if (isAuth.value) router.push({ name: 'home' })
}

const isDisabled = computed(() => userData.email.trim().length < 3)
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <h3 class="login-form__title">Войти</h3>
    <HdInput
      class="login-form__input"
      icon="person"
      label="Логин"
      v-model="userData.email"
      name="email"
      requried
    />
    <HdInput
      class="login-form__input"
      icon="lock"
      label="Пароль"
      v-model="userData.password"
      name="password"
      requried
    />
    <HdButton text="Войти" class="login-form__submit" :disabled="isDisabled" />
    <div class="login-form__description">
      <RouterLink to="/login">Забыли пароль?</RouterLink>
    </div>
  </form>
</template>

<style lang="scss" scoped src="./LoginForm.scss"></style>
