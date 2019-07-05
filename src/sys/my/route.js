export default [
  {
    path: '/my/info',
    component: () => import('./MyInfo'),
  }, {
    path: '/my/wallet',
    component: () => import('./MyWallet'),
  },
];
