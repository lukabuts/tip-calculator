import './style.css'
import dollarImg from './imgs/dollar.svg'
import userImg from './imgs/user.svg'
import { useEffect, useState } from 'react';

function App() {

  const storedData = JSON.parse(localStorage.getItem('info')) || {};

  const [ bill, setBill ] = useState(storedData.bill || 0);
  const [ people, setPeople ] = useState(storedData.people || 0);
  const [ tip, setTip ] = useState(storedData.tip || 0);

  const [ total, setTotal ] = useState(0);
  const [ tipPerPers, setTipPerPers ] = useState(0)

  useEffect(() => {
    const newTotal = (bill / 100 * tip).toFixed(2);
    setTotal(newTotal)

    
  }, [tip, bill])



  useEffect(() => {
    const data = {
      bill: bill,
      tip: tip,
      people: people
    }

    localStorage.setItem('info', JSON.stringify(data))

    if(people === 0) {
      setTipPerPers('0.00')
      return;
    }
    const newTipPerPers = (bill / 100 * tip / people).toFixed(2);
    setTipPerPers(newTipPerPers)

  }, [tip, bill, people])

  const tips = [5, 10, 15, 25, 50];

  function handleBill(e){
    if(e.target.value.trim() === "" ||
      e.target.value <= 0) {
      setBill(0);
      e.target.value = "";
      return;
    }
    setBill(e.target.valueAsNumber)
  }

  function handleTip(tipValue){
    tipValue === tip ? setTip() : setTip(tipValue);
  }

  function handleTipChange(e){
    const inputNum = e.target.valueAsNumber;
    if(e.target.value.trim() === "" ) {
      setTip(0)
      return
    } else if(
      inputNum > 100 ||
      inputNum <= 0 ){
      e.target.value = "";
      setTip(0)
      return;
    }

    setTip(inputNum);
  }

  function handlePeople(e){
    if(e.target.value.trim() === "" ||
      e.target.value <= 0) {
      setPeople(0);
      e.target.value = "";
      return
    }
    setPeople(e.target.valueAsNumber)
  }
  
   return(
    <>

      <div className="name">
        <h1>splitter</h1>
      </div>

      <div className="calculator">

        <div className="user-input">

          <div className="bill-input">
            <label htmlFor="bill">Bill</label>
            <input 
            type="number" 
            id="bill"
            onChange={handleBill}
            placeholder={bill}
            value={bill !== 0 && bill}
            />
            <img src={dollarImg} alt="" />
          </div>

          <div className="select-tip">
            <p>Select Tip</p>
            <div className="tips">
              {tips.map(tipValue => {
                return (
                  <button 
                  className={tip === tipValue ? "tip active" : "tip"} 
                  key={tipValue}
                  onClick={() => handleTip(tipValue)}
                  >
                    {tipValue}%
                  </button>
                )
              })}
              <input 
              type="number"
              placeholder='Custom'
              className='tip'
              onChange={handleTipChange}
              value={tip === 0 ? '' : tip === 5 ? '' : tip === 10 ? '' : tip === 15 ? '' : tip === 25 ? '' : tip === 50 ? '' : tip}
              />
            </div>
          </div>

          <div className="num-of-ppl">
            <label htmlFor="ppl">Number of People</label>
            <input 
            type="number" 
            id="ppl" 
            onChange={handlePeople}
            placeholder={people}
            value={people !== 0 && people}
            />
            <img src={userImg} alt="" />
          </div>

        </div>

        <div className="output">

          <div className="calculation">
            <div className="tip-amount">
              <p>Tip Amount <span>/ person</span></p>
              <h2>
                $  {isNaN(tipPerPers) ? "0.00" : tipPerPers}
              </h2>
            </div>

            <div className="total">
              <p>Total</p>
              <h2>
                $ {isNaN(total) ? "0.00" : total }
              </h2>
            </div>
          </div>

          <div className="reset-btn"
          onClick={() => {
            setBill(0);
            setPeople(0)
            setTip(0)
          }}>
            reset
          </div>

        </div>

      </div>

    </>
   )
}

export default App
