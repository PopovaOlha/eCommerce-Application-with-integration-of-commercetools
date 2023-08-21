import { makeAutoObservable } from 'mobx'

class AuthStore {
  isAuthenticated = false
  token: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  login() {
    this.isAuthenticated = true
    // this.token = token
  }

  logout() {
    this.isAuthenticated = false
    // this.token = null;
    // console.log(this)
  }
}

export default AuthStore
