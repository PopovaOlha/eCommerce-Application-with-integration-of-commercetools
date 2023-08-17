
export interface AuthResponseData {
    token: string
    user: string
  }

export interface LoginData {
    email: string
    password: string
  }
  
export interface CustomerResponseData {
    id: number
     version: number
  }
export interface Address {
    streetName: string
    city: string
    postalCode: string
    country: string
    state: string
  }
export interface CustomerData {
    firstName: string
    lastName: string
    email: string
    password: string
    addresses: Address[]
  }

  export interface FormValues extends Address {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
  }
  