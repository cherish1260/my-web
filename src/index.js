import React from 'react';
import { render } from 'react-dom';
import { Router as BrowserRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import Frame from 'src/frame';
import routes from 'sys/route';
import Router from 'router';
import { Provider, inject, observer } from 'mobx-react';
import OrderStore from './mobx/orderStore';
import UserStore from './mobx/userStore';

const stores = {
  orderStore: new OrderStore(),
  userStore: new UserStore(),
};
@inject('userStore')
@observer
class App extends React.Component {
  componentDidMount() {
    const { userStore } = this.props;
    userStore.setUserName('张三');
    userStore.changeUserName();
  }

  render() {
    return (
      <BrowserRouter history={createBrowserHistory()}>
        <Frame>
          <Router routes={routes} />
        </Frame>
      </BrowserRouter>
    );
  }
}
render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('app'));
