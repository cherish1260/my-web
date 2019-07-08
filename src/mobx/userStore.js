import { observable, action } from 'mobx';

export default class UserStore {
  @observable userName = '';

  @action setUserName(userName) {
    this.userName = userName;
  }

  @action changeUserName() {
    setTimeout(this.fetchUserName, 1000);
  }

  @action.bound fetchUserName() {
    this.userName = '李四';
  }
}
