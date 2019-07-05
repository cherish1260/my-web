/**
 * 系统菜单
*/
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Menu, Icon } from 'antd';
import Menus from './data';

const SubMenu = Menu.SubMenu;

class Slider extends Component {
  cache = {
    menuList: [],
  }

  constructor(props) {
    super(props);
    const menus = this.renderMenu(Menus);
    const [selectKeys] = this.getKeys(props.location.pathname);
    const openKeys = [];
    this.state = {
      menus,
      openKeys,
      selectKeys,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    history.listen(({ pathname }) => {
      const [openKeys, selectKeys] = this.getKeys(pathname);
      this.setState({ openKeys, selectKeys });
    });
  }

  onOpenChange = (openKeys) => {
    this.setState({ openKeys });
  }

  onSelect = ({ key }) => {
    const { menuList } = this.cache;
    const { history } = this.props;
    const menu = menuList.find(item => item.key === key);
    if (menu && menu.url) {
      history.push(menu.url);
    }
  }

  renderMenuNodes = (menus, prevKey = 'menu') => menus.map((menu, i) => {
    const { name, code, icon, nodes, url } = menu;
    const menuKey = `${prevKey}-${i}`;
    this.cache.menuList.push({ key: menuKey, code, url });
    if (nodes) {
      return (
        <SubMenu
          key={menuKey}
          title={(
            <span>
              {icon ? <Icon type={icon} />
                : ''}
              <span>{name}</span>
            </span>
          )}
        >
          {this.renderMenuNodes(nodes, menuKey)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={menuKey}>
        {
          icon
            ? <Icon type={icon} />
            : ''
        }
        <span>{name}</span>
      </Menu.Item>
    );
  })

  renderMenu = (menus) => {
    this.cache.menuList = [];
    return this.renderMenuNodes(menus);
  }

  getKeys = (pathname) => {
    const menu = this.cache.menuList.find(item => item.url === pathname);
    let openKeys = [];
    const selectKeys = [];
    if (menu && menu.key) {
      menu.key.split('-').reduce((val, cur, index) => {
        if (index === 0) return cur;
        val = `${val}-${cur}`;
        openKeys.push(val);
        return val;
      });
      selectKeys.push(menu.key);
    } else if (this.state) {
      // eslint-disable-next-line react/destructuring-assignment
      openKeys = this.state.openKeys.slice(0, 2);
    }
    // 去重并返回
    return [openKeys, selectKeys];
  }

  render() {
    const { collapsed } = this.props;
    const { menus, openKeys, selectKeys } = this.state;
    return (
      <Menu
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        openKeys={openKeys || 'menu-0'}
        onOpenChange={this.onOpenChange}
        selectedKeys={selectKeys}
        onSelect={this.onSelect}
      >
        {menus}
      </Menu>
    );
  }
}

export default withRouter(Slider);
