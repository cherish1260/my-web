import React from 'react';
import { inject, observer } from 'mobx-react';
import style from './index.less';

@inject('userStore')
@observer
class Home extends React.Component {
  render() {
    const { userStore } = this.props;
    return (
      <div className={style.home}>欢迎来到晓之屋，{userStore.userName}</div>
    );
  }
}

export default Home;
