import React, { createContext, useState, useContext } from 'react';
import { DUMMY_DATA } from '../pages/Invoices/constants';
const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(DUMMY_DATA);

  const addInvoice = (newInvoice) => {
    setInvoices([...invoices, { id: invoices.length, ...newInvoice }]);
  };

  const removeInvoice = (index) => {
    const updatedInvoices = [...invoices];
    updatedInvoices.splice(index, 1);
    setInvoices(updatedInvoices);
  };

  const value = {
    invoices,
    addInvoice,
    removeInvoice
  };

  return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
};

export const useInvoice = () => useContext(InvoiceContext);
