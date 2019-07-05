import React from 'react';
import { Layout } from 'antd';
import './index.less';

const Header = Layout.Header;
export default class FrameHeader extends React.Component {
  render() {
    return (
      <Header {...this.props}>
        <h1 className="header-title">欢迎来到晓之屋</h1>
      </Header>
    );
  }
}
