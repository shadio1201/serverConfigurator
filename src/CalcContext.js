import React, { useEffect } from "react";
import { useState, useContext } from "react";

const CalcUpdateContext = React.createContext();

//rows
const RowsCount = React.createContext();
const CounterRows = React.createContext();
const RemoveRows = React.createContext();

//totals
const TotalCount = React.createContext();
const TotalCalc = React.createContext();

export function useCalcUpdate() {
  return useContext(CalcUpdateContext)
}

export function useRows() {
  return useContext(RowsCount)
}

export function useTotal() {
  return useContext(TotalCount)
}

/* export function useTotalCalc() {
  return useContext(TotalCalc)
} */

export function useCounterRows() {
  return useContext(CounterRows)
}

export function useRemoveRows() {
  return useContext(RemoveRows)
}

export function CalcProvider({ children }) {
    
    const [rows, setRows] = useState([]);
    let total = [0, 0, 0]

    if(rows[0]) {
      total = rows.reduce((prev, next) => {
        return [prev[0] + next[0], prev[1] + next[1], prev[2] + next[2]];
      });
    }



/*     const calculateTotals = () => {
      for(let i = 0; i < rows.length; i++) {
        let without = [rows[i][1], rows[i][2], rows[i][3],]
        array.push(without);
      }
  
      let totals = [totalAmount[0], Number(totalAmount[1].toFixed(2)), Number(totalAmount[2].toFixed(2))];
    } */

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
    }

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