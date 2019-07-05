/**
 * 前端菜单配置：
 * 仅应用于开发环境，生产环境用init接口中的菜单配置
 */
export default [
  {
    code: 'home',
    name: '首页',
    icon: 'icon-home',
    link: '/home',
    url: '/home',
  },
  {
    code: 'my',
    name: '我的',
    icon: 'icon-person',
    nodes: [
      {
        code: 'info',
        name: '个人信息',
        icon: 'icon-info',
        url: '/my/info',
      },
      {
        code: 'manager-platform-commission',
        name: '我的钱包',
        icon: 'icon-ratio',
        url: '/my/wallet',
      },
    ],
  },
];
