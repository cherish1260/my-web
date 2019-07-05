import { observable, action } from 'mobx';

export default class UserStore {
  @observable userName = '';

  @action setUserName(userName) {
    this.userName = userName;
  }
}
