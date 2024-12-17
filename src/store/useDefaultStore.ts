import { BaseAPI } from '@/api/base-api'
import { SettingsAPI } from '@/api/settings-api'
import type {
  Address,
  AddressModel,
  BaseContact,
  Mail,
  MailModel,
  Phone,
  PhoneModel,
} from '@/shared/types/contact'
import { useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useDefaultStore = defineStore('default', () => {
  const baseContacts = ref<BaseContact>()
  const footerContacts = ref<BaseContact>()
  const isMenuOpen = ref(false)

  const phone = ref<Phone>({ number: '' })
  const mail = ref<Mail>({ address: '' })
  const address = ref<Address>({
    region: '',
    district: '',
    street: '',
    zip: '',
  })

  const pending = ref(false)
  const phones = ref<Phone[]>([])
  const emails = ref<Mail[]>([])
  const addresses = ref<Address[]>([])

  const [isOpenPhoneModal, togglePhoneModalState] = useToggle()
  const [isOpenMailModal, toggleMailModalState] = useToggle()
  const [isOpenAddressModal, toggleAddressModalState] = useToggle()
  const [isFooterContactsOn, toggleBaseAndFooterContacts] = useToggle()

  const contacts = computed(() => {
    if (isFooterContactsOn.value) {
      fetchFooterContacts()
      return footerContacts.value
    } else {
      return baseContacts.value
    }
  })

  const phoneModel: PhoneModel = reactive({ id: '', label: '' })
  const mailModel: MailModel = reactive({ id: '', label: '' })
  const addressModel: AddressModel = reactive({ id: '', label: '' })

  const toggleMenuOpenState = () => (isMenuOpen.value = !isMenuOpen.value)

  function addPhoneModel() {
    if (typeof contacts.value === 'undefined') return
    contacts.value.phones.push({ ...phoneModel })
  }

  function addMailModel() {
    if (typeof contacts.value === 'undefined') return
    contacts.value.emails.push({ ...mailModel })
  }

  function addAddressModel() {
    if (typeof contacts.value === 'undefined') return
    contacts.value.addresses.push({ ...addressModel })
  }

  async function fetchBaseContacts() {
    if (baseContacts.value?.emails?.length) return
    pending.value = true
    const { contactData } = await SettingsAPI.fetchBaseContacts()
    pending.value = false
    baseContacts.value = contactData
  }

  async function fetchFooterContacts() {
    if (footerContacts.value?.emails?.length) return
    pending.value = true
    const { contactData } = await SettingsAPI.fetchFooterContacts()
    pending.value = false
    footerContacts.value = contactData
  }

  async function addAddress() {
    if (!address.value.street) return false
    pending.value = true
    const response = await SettingsAPI.addAddress(address)
    pending.value = false
    if (!response)
      return console.warn('Some trouble with adding address to Data Base')
    addresses.value.push(response.address)
    _resetModels()
    return true
  }

  async function deleteAddress(id: string, toggleContext?: () => void) {
    pending.value = true
    const response = await SettingsAPI.deleteAddress(id)
    pending.value = false
    if (!response?.address) return
    addresses.value = addresses.value.filter(
      (adr) => adr.id !== response.address.id
    )
    if (toggleContext) toggleContext()
    return true
  }

  async function addMail() {
    if (!mail.value.address) return false
    pending.value = true
    const response = await SettingsAPI.addMail(mail)

    pending.value = false
    if (!response?.id)
      return console.warn('Some trouble with adding mail to Data Base')
    emails.value.push(response)
    _resetModels()
    return true
  }

  async function deleteMail(id: string, toggleContext?: () => void) {
    pending.value = true
    const response = await SettingsAPI.deleteMail(id)
    pending.value = false
    if (!response?.mail) return
    emails.value = emails.value.filter((adr) => adr.id !== response.mail.id)
    if (toggleContext) toggleContext()
    return true
  }

  async function addPhone() {
    if (!phone.value.number) return false
    pending.value = true
    const response = await SettingsAPI.addPhone(phone)
    pending.value = false
    if (!response)
      return console.warn('Some trouble with adding phone to Data Base')
    phones.value.push(response.phone)
    _resetModels()
    return true
  }

  async function deletePhone(id: string, toggleContext?: () => void) {
    pending.value = true
    const response = await SettingsAPI.deletePhone(id)
    pending.value = false
    if (!response?.phone) return
    phones.value = phones.value.filter((adr) => adr.id !== response.phone.id)
    if (toggleContext) toggleContext()
    return true
  }

  function _resetModels() {
    phone.value = { number: '' }
    mail.value = { address: '' }
    address.value = { region: '', district: '', street: '', zip: '' }
  }

  async function fetchBaseData() {
    const response = await BaseAPI.baseData()
    if (!response) return console.warn("Can't upload base data")
    phones.value = response.phones
    emails.value = response.emails
    addresses.value = response.addresses
  }

  async function saveChanges() {
    if (typeof contacts.value === 'undefined') return
    if (isFooterContactsOn.value) {
      await SettingsAPI.updateFooter(contacts.value)
    } else {
      await SettingsAPI.updateContacts(contacts.value)
    }
  }

  return {
    isMenuOpen,
    toggleMenuOpenState,
    fetchBaseContacts,
    fetchFooterContacts,
    fetchBaseData,
    saveChanges,
    addPhoneModel,
    addMailModel,
    addAddressModel,
    togglePhoneModalState,
    toggleMailModalState,
    toggleAddressModalState,
    addAddress,
    addMail,
    addPhone,
    deleteAddress,
    deleteMail,
    deletePhone,
    baseContacts,
    phones,
    emails,
    addresses,
    isOpenPhoneModal,
    isOpenAddressModal,
    isOpenMailModal,
    phone,
    mail,
    address,
    isFooterContactsOn,
    toggleBaseAndFooterContacts,
    contacts,
  }
})
