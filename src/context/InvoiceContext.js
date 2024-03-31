import React, { createContext, useState, useContext } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (newInvoice) => {
    setInvoices([...invoices, newInvoice]);
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
