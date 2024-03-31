import React from 'react';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import Input from '../../components/Input/Input';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  invoiceNumber: Yup.number().required('Invoice Number is required'),
  customerName: Yup.string().required('Customer Name is required'),
  billingAddress: Yup.string().required('Billing Ad is required'),
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

const InvoiceForm = () => (
  <div className="w-[100%] h-[100%] flex flex-col items-center overscroll-auto">
    <h1 className=" mt-4 mb-4 text-xl font-bold">Invoice Details</h1>

    <Formik
      initialValues={{
        date: '',
        invoiceNumber: 0,
        customerName: '',
        billingAddress: '',
        shippingAddress: '',
        GSTIN: '',
        totalAmount: 0,
        items: [],
        BillSundrys: []
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="w-[40%] min-w-[300px] flex flex-col gap-4  bg-slate-200 p-4 rounded-xl ">
          <label htmlFor="items">Invoice Number</label>
          <Input
            type="number"
            name="InvoiceNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.invoiceNumber}
            placeholder="Invoice Number"
          />
          <ErrorMessage name="invoiceNumber" component="div" className="error" />

          <label htmlFor="items">Customer Number</label>
          <Input
            type="text"
            name="CustomerName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.customerName}
            placeholder="Customer Number"
          />

          <ErrorMessage name="customerName" component="div" className="error" />

          <label htmlFor="items">Billing Address</label>
          <Input
            type="text"
            name="BillingAddress"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.billingAddress}
            placeholder="Billing Address"
          />
          <ErrorMessage name="billingAddress" component="div" className="error" />

          <label htmlFor="items">Shipping Address</label>
          <Input
            type="text"
            name="ShippingAddress"
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
            name="TotalAmount"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.totalAmount}
            placeholder="Total Amount"
          />
          <ErrorMessage name="totalAmount" component="div" className="error" />

          <label htmlFor="items">Date</label>
          <Input
            type="date"
            name="Date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.date}
          />
          <ErrorMessage name="date" component="div" className="error" />

          <label htmlFor="items">Items</label>
          <FieldArray name="items">
            {({ insert, remove, push }) => (
              <div>
                {values.items.length > 0 &&
                  values.items.map((item, index) => (
                    <div key={index}>
                      <Field name={`items.${index}.itemName`} placeholder="Enter name" />
                      <ErrorMessage
                        name={`items.${index}.itemName`}
                        component="div"
                        className="error"
                      />

                      <Field
                        name={`items.${index}.quantity`}
                        placeholder="Enter quantity"
                        type="number"
                      />
                      <ErrorMessage
                        name={`items.${index}.quantity`}
                        component="div"
                        className="error"
                      />
                      <Field
                        name={`items.${index}.price`}
                        placeholder="Enter price"
                        type="number"
                      />
                      <ErrorMessage
                        name={`items.${index}.price`}
                        component="div"
                        className="error"
                      />
                      <Field
                        name={`items.${index}.amount`}
                        placeholder="Enter amount"
                        type="number"
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
              <div>
                {values.BillSundrys.length > 0 &&
                  values.BillSundrys.map((BillSundry, index) => (
                    <div key={index}>
                      <Field
                        name={`BillSundrys.${index}.billSundryName`}
                        placeholder="Enter name"
                      />
                      <ErrorMessage
                        name={`BillSundrys.${index}.billSundryName`}
                        component="div"
                        className="error"
                      />
                      <Field
                        name={`BillSundrys.${index}.amount`}
                        placeholder="Enter amount"
                        type="number"
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
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default InvoiceForm;
