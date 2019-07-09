import { observable, action } from 'mobx';

export default class OrderStore {
  @observable orderId = '';

  @action setOrderId(orderId) {
    this.orderId = orderId;
  }

  @action changeOrderId() {
    setTimeout(this.fetchUserName, 3000);
  }

  @action.bound fetchOrderId() {
    this.orderId = '12345678';
  }
}
