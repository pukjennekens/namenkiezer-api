import RegisterController from './controller/auth/RegisterController';

import registerValidator from './middleware/auth/registerValidator';

interface Route {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middleware: any[];
  controller: any;
}

const routes: Route[] = [
  {
    path: '/auth/register',
    method: 'post',
    middleware: [registerValidator],
    controller: RegisterController,
  },
];

export default routes;
