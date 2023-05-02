import Header from "../src/components/mainHeader"
import Form from "../src/components/forms/form"
import { useState } from "react";

function App() {

  const [rows, setRows] = useState([])

  const [data, setData] = useState([])

  function removeRow(id) {
    setRows(currentRows => {
      return currentRows.filter(row => {
        return row.id !== id;
      })
    })
  }

  function getData(input) {
    setData(currentData => {
      const existingIndex = currentData.findIndex(item => item.id === input.id);
      if (existingIndex !== -1) {
        // Update existing object
        const newData = [...currentData];
        newData[existingIndex] = { ...newData[existingIndex], ...input };
        return newData;
      } else {
        // Add new object
        return [...currentData, input];
      }
    });
    console.log(data)
  }

  return (
    <div className="App">
      <Header />
      <section className="flex flex-col justify-start items-center py-8 h-full">
        <div className="bg-slate-50/75 py-2 px-4 rounded-md flex flex-col justify-center items-center gap-8">
          {
            rows.map((row) => {
              return (
                <Form key={row.id} uniqueKey={row.id} removeRow={removeRow} getData={getData} />
              )
            })
          }
          <button 
          className="bg-slate-700 py-1 px-4 text-white hover:shadow-md hover:bg-slate-600"
          onClick={() => {
            setRows((currentRows) => [...currentRows, { id: Math.floor(Math.random() * 1000 )}])
          }}>Add new row</button>

        <div className="border-t-2 py-4 flex justify-between items-center w-full px-8 text-2xl">
          <h3>Amount: 10</h3>
          <div className="flex gap-4">
            <h3>70.2 Mbps</h3>
            <h3>9.3 TB</h3>
          </div>
        </div>
        </div>
        <div className="bg-slate-50/75 py-2 px-4 rounded-md flex flex-col justify-center items-center gap-8 mt-4 w-fu">
            <div className="flex justify-between items-center px-8 w-full">
              <h1>test</h1>
            </div>
        </div>
      </section>
    </div>
  );
}

export default App;
