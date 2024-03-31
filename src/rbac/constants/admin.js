import Home from '../../pages/Home/Home';
import Invoices from '../../pages/Invoices/Invoices';

const ADMIN_ROUTES = [
  {
    link: '/',
    name: 'Admin home',
    component: <Home />
  },
  {
    link: '/invoices',
    name: 'Invoices',
    component: <Invoices />
  }
];

export default ADMIN_ROUTES;
