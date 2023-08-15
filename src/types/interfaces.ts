
export interface AuthResponseData {
    token: string
    user: string
  }

export interface CustomerData {
    firstName: string
    lastName: string
    email: string
    password: string
  }
  
export interface LoginData {
    email: string
    password: string
  }
  
export interface CustomerResponseData {
    id: string
    email: string
  }