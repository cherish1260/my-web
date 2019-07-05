import React from 'react';
import { render } from 'react-dom';
import { Router as BrowserRouter } from 'react-router';
import { createBrowserHistory } from 'history';
import Frame from 'src/frame';
import routes from 'sys/route';
import Router from 'router';

class App extends React.Component {
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
render(<App />, document.getElementById('app'));
