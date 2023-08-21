// RootStore.ts
import UserStore from './UserStore';
import AuthStore from './AuthStore';

class RootStore {
  userStore: UserStore;
  authStore: AuthStore;

  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore();
  }
}


export default RootStore;
