import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('orderStore', 'userStore')
@observer
class MyInfo extends React.Component {
  componentDidMount() {
    const { orderStore } = this.props;
    orderStore.setOrderId('6783');
  }

  render() {
    const { orderStore, userStore } = this.props;
    return (
      <div>myinfo，{userStore.userName}，{orderStore.orderId}</div>
    );
  }
}

export default MyInfo;
