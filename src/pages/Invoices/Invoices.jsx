import React, { useEffect } from 'react';
import { DUMMY_COLUMNS, DUMMY_DATA } from './constants';

function Invoices() {
  return (
    <div className="w-[100%] h-[100%]">
      <h1 className="flex items-center justify-center mt-4 text-xl font-bold">Invoices</h1>

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
              <tr className="bg-white border-b  dark:border-gray-700 cursor-pointer hover:bg-slate-300">
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
