import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline"

function Form({ removeRow, uniqueKey, getData }) {

    const [Amount, setAmount] = useState(1);
    const [Res, setRes] = useState('');
    const [Comp, setComp] = useState('');
    const [Drate, setDrate] = useState(12152);
    const [Fps, setFps] = useState(10);
    const [Motion, setMotion] = useState(40);
    const [Days, setDays] = useState(30);

    const resOptions = [
        'D1',
        '1.3M',
        '2M',
        '3M',
        '4M',
        '5M',
        '6M',
        '4K'
      ];
    
      const compOptions = [
        'H.264',
        'H.265',
      ];

      useEffect(() => {
        getData({
            uniqueKey,
            Amount,
            Res,
            Comp,
            Drate,
            Fps,
            Motion,
            Days
        })
      }, [Amount, Res, Comp, Drate, Fps, Motion, Days])

    return (
    <div className="flex" id={uniqueKey}>
        <form className="flex gap-4">

            <span className="flex flex-col justify-center items-center">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" value={Amount} name="quantity" className="text-center w-fit" 
                onChange={(e) => {
                    if(e.target.value < 1) return alert('Invalid Amount')
                    setAmount(e.target.value) }
                }
                />
            </span>

            <span className="flex flex-col justify-center items-center">
                <label htmlFor="Resolution">Resolution</label>
                <select name="Resolution" className="w-full"
                value={Res}
                onChange={(e) => setRes(e.target.value)}
                >
            {
              resOptions.map((item, i) => {
                return (
                  <option key={i} value={item}>{ item }</option>
                )
              })
            }
                </select>
            </span>

            <span className="flex flex-col justify-center items-center">
                <label htmlFor="comp">Compression</label>
                <select name="comp" className="w-full"
                value={Comp}
                onChange={(e)=> setComp(e.target.value)}
                >
            {
              compOptions.map((item, i) => {
                return (
                  <option key={i} value={item}>{ item }</option>
                )
              })
            }
                </select>
            </span>

            <span className="flex flex-col justify-center items-center">
                <label htmlFor="dataRate">Data Rate (Kbps)</label>
                <input type="number" maxLength={5} value={Drate} name="dataRate" className="text-center w-fit" 
                onChange={(e) => {
                    if(e.target.value < 1 || e.target.value > 99999) return alert('Invalid Amount')
                    setDrate(e.target.value) }
                }
                />
            </span>

            <span className="flex flex-col justify-center items-center w-fit">
                <label htmlFor="FPS">FPS</label>
                <input type="number" value={Fps}  name="FPS" className="text-center" 
                onChange={(e) => {
                    if(e.target.value < 1) return alert('Invalid Amount')
                    setFps(e.target.value) }
                }
                />
            </span>

            <span className="flex flex-col justify-center items-center w-fit">
                <label htmlFor="dataMotion">Motion %</label>
                <input type="number" value={Motion} name="dataMotion" className="text-center"
                onChange={(e) => {
                    if(e.target.value < 1 || e.target.value > 100) return
                    setMotion(e.target.value) }
                }
                />
            </span>

            <span className="flex flex-col justify-center items-center w-fit">
                <label htmlFor="dataDays">Days</label>
                <input type="number" value={Days} name="dataDays" className="text-center" 
                onChange={(e) => {
                    if(e.target.value < 1) return alert('Invalid Amount')
                    setDays(e.target.value) }
                }
                />
            </span>
        </form>

        <div className="results flex gap-4 border-l-2 ml-4 pl-4">
            <span className="flex flex-col justify-center items-center w-fit">
                <p className="font-bold">Bandwidth (mbps)</p>
                <p>12.15</p>
            </span>
            <span className="flex flex-col justify-center items-center w-fit">
                <p className="font-bold">Storage(GB)</p>
                <p>1574.9</p>
            </span>
        </div>

        <button className="mx-4 hover:text-red-700"
        onClick={() => removeRow(uniqueKey)}
        >
            <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    );
}

export default Form
