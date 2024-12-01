<script setup lang="ts">
import { computed, provide, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/useAuthStore'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { userLoginSchema } from '@/shared/schemes/user-schema'
const { errors, getZodErrors } = useFormValidation()
const authStore = useAuthStore()
const { isAuth } = storeToRefs(authStore)
const router = useRouter()

const userData = reactive({
  email: '',
  password: '',
})

provide('form-errors', errors)

const onSubmit = async () => {
  await getZodErrors(userData, userLoginSchema)
  if (errors.value.length) return
  await authStore.login(userData)
  if (isAuth.value) router.push({ name: 'home' })
}

const isDisabled = computed(() => userData.email.trim().length < 3)
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <HdFormGroup name="email" label="Логин" required>
      <HdInput
        class="login-form__input"
        icon="person"
        v-model="userData.email"
      />
    </HdFormGroup>

    <HdFormGroup
      label="Пароль"
      name="password"
      help="Пароль должен состоять из букв и цифр"
      required
    >
      <HdInput
        class="login-form__input"
        icon="lock"
        v-model="userData.password"
        type="password"
      />
    </HdFormGroup>
    <HdButton
      text="Войти"
      class="login-form__submit"
      color="primary"
      variant="solid"
      type="submit"
      :disabled="isDisabled"
    />
  </form>
</template>

<style lang="scss" scoped src="./LoginForm.scss"></style>
