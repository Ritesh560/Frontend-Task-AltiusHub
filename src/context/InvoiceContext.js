import React, { createContext, useState, useContext, useEffect } from 'react';
import { DUMMY_DATA } from '../pages/Invoices/constants';
import { useNavigate } from 'react-router-dom';
const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState(DUMMY_DATA);
  const navigate = useNavigate();

  const addInvoice = (newInvoice) => {
    newInvoice.id = invoices[invoices.length - 1].id + 1;
    setInvoices([...invoices, newInvoice]);
    navigate('/invoices');
  };

  const removeInvoice = (index) => {
    const updatedInvoices = [...invoices];
    let to_d = 0;
    updatedInvoices.forEach((item, idx) => {
      if (item.id === index) {
        to_d = idx;
      }
    });
    updatedInvoices.splice(to_d, 1);
    setInvoices(updatedInvoices);
  };

  const updateInvoice = (updatedInvoice, id) => {
    let data = invoices.map((item, idx) => {
      if (item.id === id) {
        item = { ...item, ...updatedInvoice };
      }
      return item;
    });
    setInvoices(data);
    console.log(data);
    navigate('/invoices');
  };

  const value = {
    invoices,
    addInvoice,
    removeInvoice,
    updateInvoice
  };

  return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
};

export const useInvoice = () => useContext(InvoiceContext);
