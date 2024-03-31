import React, { useEffect, useState } from 'react';
import { Formik, FieldArray, Field, ErrorMessage, Form } from 'formik';
import Input from '../../components/Input/Input';
import * as Yup from 'yup';
import { useInvoice } from '../../context/InvoiceContext';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Home/components/Navbar/Navbar';

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  invoiceNumber: Yup.number().required('Invoice Number is required'),
  customerName: Yup.string().required('Customer Name is required'),
  billingAddress: Yup.string().required('Billing Address is required'),
  shippingAddress: Yup.string().required('Name is required'),
  GSTIN: Yup.string().required('Name is required'),
  items: Yup.array().of(
    Yup.object().shape({
      itemName: Yup.string().required('Name is required'),
      quantity: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .min(1, 'Amount must be greater than or equal to 0'),
      price: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .min(1, 'Amount must be greater than or equal to 0'),
      amount: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .min(1, 'Amount must be greater than or equal to 0')
    })
  ),
  BillSundrys: Yup.array().of(
    Yup.object().shape({
      billSundryName: Yup.string().required('Bill Sundry Name is required'),
      amount: Yup.number()
        .required('Amount is required')
        .min(0, 'Amount must be greater than or equal to 0')
    })
  )
});

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addInvoice, removeInvoice, invoices, updateInvoice } = useInvoice();
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    const existingInvoice = invoices.find((item) => item.id === Number(id));
    if (existingInvoice) setInitialValues(existingInvoice);
    else
      setInitialValues({
        date: '',
        invoiceNumber: 0,
        customerName: '',
        billingAddress: '',
        shippingAddress: '',
        GSTIN: '',
        totalAmount: 0,
        items: [],
        BillSundrys: []
      });
  }, [id, invoices]);

  useEffect(() => {
    console.log('initialValues', initialValues);
  }, [initialValues]);

  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center overscroll-auto">
      <div className="flex justify-between mt-4 px-4">
        <h1 className=" mt-4 mb-4 text-xl font-bold">Invoice Details</h1>
        <div></div>
      </div>

      {!!initialValues && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            if (Number(id) === 0) {
              addInvoice(values);
            } else {
              updateInvoice(values, Number(id));
            }
          }}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-[40%] min-w-[400px] flex flex-col gap-4  bg-slate-200 p-4 rounded-xl ">
              <label htmlFor="items">Invoice Number</label>
              <Input
                type="number"
                name="invoiceNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.invoiceNumber}
                placeholder="Invoice Number"
              />
              <ErrorMessage name="invoiceNumber" component="div" className="error" />

              <label htmlFor="items">Customer Number</label>
              <Input
                type="text"
                name="customerName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.customerName}
                placeholder="Customer Number"
              />

              <ErrorMessage name="customerName" component="div" className="error" />

              <label htmlFor="items">Billing Address</label>
              <Input
                type="text"
                name="billingAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.billingAddress}
                placeholder="Billing Address"
              />
              <ErrorMessage name="billingAddress" component="div" className="error" />

              <label htmlFor="items">Shipping Address</label>
              <Input
                type="text"
                name="shippingAddress"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.shippingAddress}
                placeholder="Shipping Address"
              />
              <ErrorMessage name="shippingAddress" component="div" className="error" />

              <label htmlFor="items">GSTIN</label>
              <Input
                type="number"
                name="GSTIN"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.GSTIN}
                placeholder="GSTIN"
              />
              <ErrorMessage name="GSTIN" component="div" className="error" />

              <label htmlFor="items">Total Amount</label>
              <Input
                type="number"
                name="totalAmount"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.totalAmount}
                placeholder="Total Amount"
              />
              <ErrorMessage name="totalAmount" component="div" className="error" />

              <label htmlFor="items">Date</label>
              <Input
                type="date"
                name="date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.date}
              />
              <ErrorMessage name="date" component="div" className="error" />

              <label htmlFor="items">Items</label>
              <FieldArray name="items">
                {({ insert, remove, push }) => (
                  <div className="flex flex-col gap-4 w-[100%]">
                    {values?.items?.length > 0 &&
                      values?.items?.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2 w-[100%]">
                          {/* <Field name={`items.${index}.itemName`} placeholder="Enter name" /> */}
                          <Input
                            type="text"
                            name={`items.${index}.itemName`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={item.itemName}
                          />
                          <ErrorMessage
                            name={`items.${index}.itemName`}
                            component="div"
                            className="error"
                          />

                          {/* <Field
                          name={`items.${index}.quantity`}
                          placeholder="Enter quantity"
                          type="number"
                        /> */}
                          <Input
                            type="number"
                            name={`items.${index}.quantity`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={item.quantity}
                          />
                          <ErrorMessage
                            name={`items.${index}.quantity`}
                            component="div"
                            className="error"
                          />
                          {/* <Field
                          name={`items.${index}.price`}
                          placeholder="Enter price"
                          type="number"
                        /> */}
                          <Input
                            type="number"
                            name={`items.${index}.price`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={item.price}
                          />
                          <ErrorMessage
                            name={`items.${index}.price`}
                            component="div"
                            className="error"
                          />
                          {/* <Field
                          name={`items.${index}.amount`}
                          placeholder="Enter amount"
                          type="number"
                        /> */}
                          <Input
                            type="number"
                            name={`items.${index}.amount`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={item.amount}
                          />
                          <ErrorMessage
                            name={`items.${index}.amount`}
                            component="div"
                            className="error"
                          />
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() => push({ itemName: '', quantity: 0, price: 0, amount: 0 })}>
                      Add Item
                    </button>
                  </div>
                )}
              </FieldArray>
              <label htmlFor="BillSundrys">Bill Sundrys</label>
              <FieldArray name="BillSundrys">
                {({ insert, remove, push }) => (
                  <div className="flex flex-col gap-4 w-[100%]">
                    {values?.BillSundrys?.length > 0 &&
                      values.BillSundrys.map((BillSundry, index) => (
                        <div key={index} className="flex flex-col gap-2 w-[100%]">
                          {/* <Field
                          name={`BillSundrys.${index}.billSundryName`}
                          placeholder="Enter name"
                        /> */}
                          <Input
                            type="text"
                            name={`BillSundrys.${index}.billSundryName`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={BillSundry.billSundryName}
                          />
                          <ErrorMessage
                            name={`BillSundrys.${index}.billSundryName`}
                            component="div"
                            className="error"
                          />
                          {/* <Field
                          name={`BillSundrys.${index}.amount`}
                          placeholder="Enter amount"
                          type="number"
                        /> */}
                          <Input
                            type="number"
                            name={`BillSundrys.${index}.amount`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={BillSundry.amount}
                          />
                          <ErrorMessage
                            name={`BillSundrys.${index}.amount`}
                            component="div"
                            className="error"
                          />
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      ))}
                    <button type="button" onClick={() => push({ billSundryName: '', amount: 0 })}>
                      Add Bill Sundry
                    </button>
                  </div>
                )}
              </FieldArray>
              <div className="flex items-center justify-between">
                <button
                  class="btn-default overflow-hidden relative w-auto bg-yellow-50 text-yellow-900 py-2 px-2 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-yellow-100 hover:bg-gradient-to-t hover:from-yellow-100 before:to-yellow-50 hover:-translate-y-[3px] self-center"
                  disabled={isSubmitting}
                  onClick={() => navigate('/invoices')}>
                  <span class="relative">Cancel</span>
                </button>
                <button
                  class="btn-default overflow-hidden relative w-auto bg-red-50 text-red-900 py-2 px-2 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-red-100 hover:bg-gradient-to-t hover:from-red-100 before:to-red-50 hover:-translate-y-[3px] self-center"
                  disabled={isSubmitting}
                  onClick={() => {
                    removeInvoice(Number(id));
                  }}>
                  <span class="relative">Delete</span>
                </button>
                <button
                  class="btn-default overflow-hidden relative w-auto bg-green-50 text-green-900 py-2 px-2 rounded-xl font-bold uppercase transition-all duration-100 -- hover:shadow-md border border-green-100 hover:bg-gradient-to-t hover:from-green-100 before:to-green-50 hover:-translate-y-[3px] self-center"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => {
                    // if (Number(id) === 0) {
                    //   addInvoice(values);
                    // } else {
                    //   updateInvoice(values, Number(id));
                    // }
                  }}>
                  <span class="relative">Save</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default InvoiceForm;
