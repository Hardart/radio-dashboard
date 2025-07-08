import { toValue, type MaybeRef } from 'vue'
import type { Address, BaseContact, Mail, Phone } from '@type/contact'
import type { ResponseApi } from '@type/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'
import { addFullAddressKey } from '@/shared/helpers/add-full-address'

export const SettingsAPI = {
  _emptyContacts: {
    phones: [],
    emails: [],
    addresses: [],
  },
  async fetchBaseContacts() {
    const { data } = await useHdFetch<ResponseApi.SettingAPI.Contacts>(
      '/settings/contacts'
    )

    const contactData = data.value?.contact || this._emptyContacts
    return { contactData }
  },

  async fetchFooterContacts() {
    const { data } = await useHdFetch<ResponseApi.SettingAPI.Footer>(
      '/settings/footer'
    )

    const contactData = data.value?.contact || this._emptyContacts
    return { contactData }
  },

  async updateFooter(contact: MaybeRef<BaseContact>) {
    await useHdFetch(
      '/settings/footer',
      {
        body: toValue(contact),
        method: 'PUT',
      },
      { text: 'Контакты футера успешно обновлены', duration: 2500 }
    )
  },

  async updateContacts(contact: BaseContact) {
    await useHdFetch(
      '/settings/contacts',
      {
        body: contact,
        method: 'PUT',
      },
      { text: 'Контакты успешно обновлены', duration: 2500 }
    )
  },

  async addPhone(phone: MaybeRef<Phone>) {
    const { data } = await useHdFetch<ResponseApi.PhoneSingle>(
      '/settings/phone',
      { body: toValue(phone) }
    )
    return data.value
  },

  async addMail(mail: MaybeRef<Mail>) {
    const { data } = await useHdFetch<ResponseApi.MailSingle>(
      '/settings/mail',
      { body: toValue(mail) }
    )
    return data.value?.mail
  },

  async addAddress(address: MaybeRef<Address>) {
    const { data } = await useHdFetch<ResponseApi.AddressSingle>(
      '/settings/address',
      { body: toValue(address) }
    )
    if (data.value) data.value.address = addFullAddressKey(data.value.address)
    return data.value
  },

  async deleteAddress(id: string) {
    const { data } = await useHdFetch<ResponseApi.AddressSingle>(
      '/settings/address/delete',
      {
        body: { id },
      }
    )
    return data.value
  },

  async deleteMail(id: string) {
    const { data } = await useHdFetch<ResponseApi.MailSingle>(
      '/settings/mail/delete',
      {
        body: { id },
      }
    )
    return data.value
  },

  async deletePhone(id: string) {
    const { data } = await useHdFetch<ResponseApi.PhoneSingle>(
      '/settings/phone/delete',
      {
        body: { id },
      }
    )
    return data.value
  },
}
