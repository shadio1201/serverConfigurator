import React, { useEffect } from "react";
import { useState, useContext } from "react";

const CalcUpdateContext = React.createContext();

//rows
const RowsCount = React.createContext();
const CounterRows = React.createContext();
const RemoveRows = React.createContext();

//totals
const TotalCount = React.createContext();

export function useCalcUpdate() {
  return useContext(CalcUpdateContext)
}

export function useRows() {
  return useContext(RowsCount)
}

export function useTotal() {
  return useContext(TotalCount)
}

export function useCounterRows() {
  return useContext(CounterRows)
}

export function useRemoveRows() {
  return useContext(RemoveRows)
}

export function CalcProvider({ children }) {

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState([0, 0, 0]);

useEffect(() => {
  if (rows.length > 0) {
    const [totalAmount, totalStorage, totalBandwidth] = rows.reduce(
      (acc, [amount, storage, bandwidth]) => {
        return [          acc[0] + amount,
          acc[1] + storage,
          acc[2] + bandwidth,
        ];
      },
      [0, 0, 0]
    );
    setTotal([totalAmount, totalStorage, totalBandwidth]);
  } else {
    setTotal([0, 0, 0]);
  }
}, [rows]);

function updateRows() {
  setRows((currentRows) => [...currentRows, [1, 24.36, 0.19]]);
}

function removeRow(id) {
  setRows((currentRows) => {
    return currentRows.filter((row, i) => {
      return i !== id;
    });
  });
}

function updateValues(index, amount, bandwitdh, storage) {
  const changedRow = [amount, bandwitdh, storage];
  let array = rows.map((row, i) => {
    if (index === i) {
      return changedRow;
    } else {
      return row;
    }
  });
  setRows(array);
}
    
/*     const [rows, setRows] = useState([]);
    let total = [0, 0, 0]

    if(rows[0]) {
      total = rows.reduce((prev, next) => {
        return [prev[0] + next[0], prev[1] + next[1], prev[2] + next[2]];
      });
    }

    function updateRows() {
      let id = Math.floor(Math.random() * 1000 );
      setRows((currentRows) => [...currentRows, [1, 24.36, 0.19]])
    }

    function removeRow(id) {
      setRows(currentRows => {
        return currentRows.filter((row, i) => {
          return i !== id;
        })
      })
    }

    function updateValues(key, amount, bandwitdh, storage) {

        const indexOfitem = rows.findIndex( x => x[0] === key);

        const changedRow = [key, amount, bandwitdh, storage];

        let array = rows.map((row, i) => {
            if(indexOfitem === i) {
                return changedRow;
            } else {
                return row
            }
            });
          setRows(array); 
    } */

/*     useEffect(() => {
      if(rows[0]) {
        calculateTotals();
      }
      
    }, [rows]) */

    return (
      <TotalCount.Provider value={total}>
      <RowsCount.Provider value={rows}>
        <CounterRows.Provider value={updateRows}>
          <RemoveRows.Provider value={removeRow}>
            <CalcUpdateContext.Provider value={updateValues} >
                {children}
            </CalcUpdateContext.Provider>
          </RemoveRows.Provider>
        </CounterRows.Provider>
      </RowsCount.Provider>
      </TotalCount.Provider>
    )

}


// https://www.youtube.com/watch?v=gjOezfVo0mE on delay problem