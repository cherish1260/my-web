import { observable, action } from 'mobx';

export default class UserStore {
  @observable userName = '';

  @action setUserName(userName) {
    this.userName = userName;
  }

  @action changeUserName() {
    setTimeout(this.fetchUserName, 3000);
  }

  @action.bound fetchUserName() {
    this.userName = '李四';
  }
}
