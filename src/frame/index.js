import React from 'react';
import { Layout, Icon } from 'antd';
import Header from './header';
import Menu from './menu';
import './index.less';
import './theme/default.less';

const { Content } = Layout;
export default class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      arrowStyle: {},
    };
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
      arrowStyle: !collapsed ? { transform: 'rotate(180deg)' } : {},
    });
  }

  render() {
    const { collapsed, arrowStyle } = this.state;
    const { children } = this.props;
    return (
      <Layout>
        <Header className="header" />
        <Layout className="main" hasSider={true}>
          <aside
            className={`menu ${collapsed ? 'collapsed' : ''}`}
          >
            <Menu collapsed={collapsed} />
            <div className="sider-collapse" style={arrowStyle}>
              <Icon type="caret-left" onClick={this.toggle} />
            </div>
          </aside>
          <Content className="content" id="page">
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
