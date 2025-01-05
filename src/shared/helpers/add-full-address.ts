import type { Address } from '../types/contact'

export function addFullAddressKey(ad: Address) {
  const { region, district, city, street, locality, houseNumber } = ad
  const fullAddress = [region, district, city, locality, street, houseNumber]
    .filter((item) => item !== '')
    .join(', ')

  return { ...ad, fullAddress } // добавить виртуальное поле в модели Address на бэкенде
}
