import Header from "../src/components/mainHeader"
import Form from "../src/components/forms/form"
import { useState } from "react";

function App() {

  const [Rows, setRows] = useState([{ id: 1 }]);

  const [Calc, setCalc] = useState([{ id: 0, Amount: 1, bandwitdh: 0.19, storage: 24.36 }])
  const [Amounts, setAmounts] = useState()

  const [Total, setTotal] = useState({ total: 0, totalBandwitdh: 100, totalStorage: 1525.2 })

  function removeRow(id) {
    setRows(currentRows => {
      return currentRows.filter(row => {
        return row.id !== id;
      })
    })
  }

  function getData(input) {
    setData(() => {
      setData([...data, input])
    })
  }

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
                <Form key={row.id} uniqueKey={row.id} removeRow={removeRow} CalcStorageAndMbps={CalculateStorageAndMbps} CalcData={Calc[i]} />
              )
            })
          }
          <button 
          className="bg-slate-700 py-1 px-4 text-white hover:shadow-md hover:bg-slate-600"
          onClick={() => {
            let id = Math.floor(Math.random() * 1000 );
            setRows((currentRows) => [...currentRows, { id: id }])
            setCalc((currentCalc)=> [...currentCalc, { id: id, Amount: 1, bandwitdh: 0.19, storage: 24.36 }])
          
          }}>Add new row</button>

        <div className="border-t-2 py-4 flex justify-between items-center w-full px-8 text-2xl">
          <h3>Amount: { Total.total }</h3>
          <div className="flex gap-4">
            <h3>{ Total.totalBandwitdh } Mbps</h3>
            <h3>{ Total.totalStorage } TB</h3>
          </div>
        </div>
        </div>
        <div className="bg-slate-50/75 py-2 px-4 rounded-md flex flex-col justify-center items-center gap-8 mt-4 w-full">
            <div className="flex justify-between items-center px-8 w-full">
              
              <span>
              <h2>Hent din PDF her</h2>
              <button
              className="py-1 px-4 bg-orange-400 text-white"
              onClick={() => console.log('PDF downloading...')}
              >Download PDF</button>
              </span>
            </div>
        </div>
      </section>
    </div>
  );
}

export default App;
