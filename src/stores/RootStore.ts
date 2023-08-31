// RootStore.ts
import UserStore from './UserStore';
import AuthStore from './AuthStore';
import CatalogStore from './CatalogStore';

class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  catalogStore: CatalogStore;

  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore();
    this.catalogStore = new CatalogStore();
  }
}


export default RootStore;
