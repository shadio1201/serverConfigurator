import Header from "../src/components/mainHeader"
import Form from "../src/components/forms/form"
import { useEffect, useState } from "react";
import { useRows, useCounterRows, useRemoveRows, useTotal } from './CalcContext'

function App() {
  const Rows = useRows();
  const CountRows = useCounterRows();
  const RemoveRows = useRemoveRows();
  const Total = useTotal();

  return (
    <div className="App">
      <Header />
      <section className="flex flex-col justify-start items-center py-8 h-full">
        <div  className="bg-slate-50/75 py-2 px-4 rounded-md flex flex-col justify-center items-center gap-8 w-[85%]">
          {
            !Rows.length && <p className="text-2xl py-2">Please add a row</p>
          }
          {
            Rows.map((row, i) => {
              return (
                  <Form key={i} uniqueKey={i} removeRow={RemoveRows} />
              )
            })
          }
          <button 
          className="bg-slate-700 py-1 px-4 text-white hover:shadow-md hover:bg-slate-600"
          onClick={CountRows}>Add new row</button>

        <div className="border-t-2 py-4 flex justify-between items-center w-full px-8 text-2xl">
          <h3>Amount: { Total[0] }</h3>
          <div className="flex gap-4">
            <h3>{ Number(Total[1].toFixed(2)) } Mbps</h3>
            <h3>{ Number(Total[2].toFixed(2)) } GB</h3>
          </div>
        </div>
        </div>
        <div className="bg-slate-50/75 py-2 px-4 rounded-md flex flex-col justify-center items-center gap-8 mt-8 w-[85%]">
            <div className="flex justify-between items-center px-8 w-full">
              
              <span>
              <h2>Hent din PDF her</h2>
              <button
              className="py-1 px-4 bg-orange-400 text-white"
              onClick={() => console.log('Sending pdf...')}
              >Download PDF</button>
              </span>
            </div>
        </div>
      </section>
    </div>
  );
}

export default App;
