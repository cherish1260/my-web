import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class MyInfo extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div>myinfo，{store.userName}</div>
    );
  }
}

export default MyInfo;
