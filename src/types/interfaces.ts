export interface AuthResponseData {
  token: string
  user: string
  access_token: string
}

export interface LoginData {
  email: string
  password: string
}

export interface CustomerResponseData {
  id: number
  email: number
}
export interface Address {
  streetName: string
  city: string
  postalCode: string
  country: string
  state: string
}

export interface FormValues extends Address {
  firstName: string
  lastName: string
  login: string
  password: string
}

export interface CustomerData {
  firstName: string
  lastName: string
  birthday: string
  email: string
  password: string
  addresses: Address[]
  defaultShippingAddress?: number
  defaultBillingAddress?: number
  shippingAddresses: number[]
  billingAddresses: number[]
}

export interface RegistrationValues {
  defaultAddress: boolean
  firstName: string
  lastName: string
  dateOfBirth: string
  login: string
  password: string
  shippingAddress: Addresses
  billingAddress: Addresses
}
export interface Addresses {
  streetName: string
  city: string
  postalCode: string
  country: string
  state: string
  isDefault: boolean
}
export interface Product {
  id: string
  key: string
  name: { 'en-US': string }
  description: { 'en-US': string }
  imageUrl: string[]
  price: number[]
  discount?: number | null
}

export interface RawProduct {
  id: string
  key: string
  masterData: {
    staged: any
    current: {
      name: { 'en-US': string }
      staged: {
        description: { 'en-US': string }
      }
      masterVariant: {
        images: {
          url: string
        }[]
        prices: {
          value: {
            centAmount: number
          }
          discounted?: {
            value: {
              centAmount: number
            }
          }
        }[]
      }
    }
  }
}
export interface HeaderProps {
  subcategories: string[]
}

export interface Category {
  id: string
  name: { 'en-US': string }
  parent?: { id: string }
}

export interface Subcategory {
  id: string
  name: string
}
export interface RawProductList {
  id: string
  key: string
  name: { 'en-US': string }
  description: { 'en-US': string }
  masterVariant: {
    images: { url: string }[]
    prices: {
      value: {
        centAmount: number
      }
      discounted?: {
        value: {
          centAmount: number
        }
      }
    }[]
  }
}
export interface LineItem {
  discountedPrice?: {
    value: {
      centAmount: number
    }
  }
  productId: string
  quantity: number
  price: {
    value: {
      centAmount: number
    }
    discounted?: {
      value: {
        centAmount: number
      }
    }
  }
  totalPrice: {
    centAmount: number
  }
  id: string
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
  totalPrice: number
  lineId: string
  discountPrice: number | string
  discount: number | undefined
}
