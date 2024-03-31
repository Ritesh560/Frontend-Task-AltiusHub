import Home from '../../pages/Home/Home';
import InvoiceForm from '../../pages/InvoiceForm/InvoiceForm';
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
  },
  {
    link: '/invoicedetailcomponent',
    name: 'Invoice Details',
    component: <InvoiceForm />
  }
];

export default ADMIN_ROUTES;
