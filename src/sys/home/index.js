import React from 'react';
import { inject, observer } from 'mobx-react';
import style from './index.less';

@inject('store')
@observer
class Home extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <div className={style.home}>欢迎来到晓之屋，{store.userName}</div>
    );
  }
}

export default Home;
