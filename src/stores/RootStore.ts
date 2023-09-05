// RootStore.ts
import UserStore from './UserStore';
import AuthStore from './AuthStore';
import CatalogStore from './CatalogStore';
import CategoryStore from './CategoryStore'



class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  catalogStore: CatalogStore;
  categoryStore: CategoryStore;

  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore();
    this.catalogStore = new CatalogStore();
    this.categoryStore = new CategoryStore()
  }
}


export default RootStore;
