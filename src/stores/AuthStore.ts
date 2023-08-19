import { makeAutoObservable } from 'mobx';

class AuthStore {
  isAuthenticated = false;
  token!: string | null;

  constructor() {
    makeAutoObservable(this);
  }

  login(token: string) {
    this.isAuthenticated = true;
    this.token = token;
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
  }
}

export default AuthStore;