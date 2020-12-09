import IndexController from './controller/IndexController';
import RegisterController from './controller/auth/RegisterController';
import LoginController from './controller/auth/LoginController';

import registerValidator from './middleware/auth/registerValidator';
import loginValidator from './middleware/auth/loginValidator';
import isAuthenticated from './middleware/auth/isAuthenticated';

interface Route {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middleware: any[];
  controller: any;
}

const routes: Route[] = [
  {
    path: '/',
    method: 'get',
    middleware: [isAuthenticated(['ROLE_USER'])],
    controller: IndexController,
  },
  {
    path: '/auth/register',
    method: 'post',
    middleware: [registerValidator],
    controller: RegisterController,
  },
  {
    path: '/auth/login',
    method: 'post',
    middleware: [loginValidator],
    controller: LoginController,
  },
];

export default routes;
