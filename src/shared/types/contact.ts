export type BaseContactModel = {
  id: string
  label: string
  description?: string
  priority?: number
}
export type Mail = {
  id?: string
  address: string
}

export type Phone = {
  id?: string
  number: string
}

export type Address = {
  id?: string
  city?: string
  locality?: string
  region: string
  district: string
  street: string
  zip: string
  houseNumber?: number
  appartment?: number
  yaMapUrl?: string
  fullAddress?: string
}

export type MailModel = BaseContactModel
export type PhoneModel = BaseContactModel
export type AddressModel = BaseContactModel

export type BaseContact = {
  emails: MailModel[]
  phones: PhoneModel[]
  addresses: AddressModel[]
}
