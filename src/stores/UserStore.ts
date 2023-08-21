
import { makeObservable, observable, action } from 'mobx';

 class UserStore {
  token: string | null = null;
  userProfile: string | undefined; 

  constructor() {
    makeObservable(this, {
      token: observable,
      userProfile: observable,
      setTokenAndProfile: action,
    });
  }

  setTokenAndProfile(token: string, userProfile: string) {
    this.token = token;
    this.userProfile = userProfile;
  }
}

export default UserStore;
