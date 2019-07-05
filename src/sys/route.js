import MyRoutes from './my/route';
import ErrorRoute from './error/route';

export default [
  {
    // 欢迎页面
    path: '/',
    component: () => import('./home'),
    exact: true,
  },
  {
    // 首页
    path: '/home',
    component: () => import('./home'),
  },
  {
    // 我的
    path: '/my',
    routes: MyRoutes,
  },
  {
    path: '/error',
    routes: ErrorRoute,
  },
];
