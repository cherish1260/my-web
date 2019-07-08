import React from 'react';
import { render } from 'react-dom';
import { Router as BrowserRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import Frame from 'src/frame';
import routes from 'sys/route';
import Router from 'router';
import { Provider, inject, observer } from 'mobx-react';
import UserStore from './mobx/userStore';

const userStore = new UserStore();
@inject('store')
@observer
class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.setUserName('张三');
    store.changeUserName();
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
  <Provider store={userStore}>
    <App />
  </Provider>,
  document.getElementById('app'));
