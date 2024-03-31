import React, { useEffect } from 'react';
import { DUMMY_COLUMNS, DUMMY_DATA } from './constants';
import { useNavigate } from 'react-router-dom';

function Invoices() {
  const navigate = useNavigate();

  return (
    <div className="w-[100%] h-[100%]">
      <div className="flex mt-4">
        <h1 className="w-[100%] flex items-center justify-center  text-xl font-bold">Invoices</h1>
        <button
          className=" w-[100px] h-[30px] mr-[20px]  font-bold cursor-pointer bg-blue-500 text-white rounded-lg"
          onClick={() => navigate('/invoicedetailcomponent/0')}>
          Add +
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 ">
        <table class="w-full text-sm text-left rtl:text-right  ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {DUMMY_COLUMNS.map((col) => (
                <th className="px-6 py-3">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DUMMY_DATA.map((item) => (
              <tr
                onClick={() => navigate(`/invoicedetailcomponent/${item.Id}`)}
                className="bg-white border-b  dark:border-gray-700 cursor-pointer hover:bg-slate-300">
                {DUMMY_COLUMNS.map((col) => (
                  <td className="px-6 py-4">{item?.[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoices;
