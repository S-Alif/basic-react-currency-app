import { useEffect, useState } from "react";


const App = () => {

  const [currNames, setCurrNames] = useState([])
  const [currFrom, setCurrFrom] = useState("USD")
  const [currTo, setCurrTo] = useState("GBP")
  const [amount, setamount] = useState(1)
  const [converted, setConverted] = useState(0)

  useEffect(() => {

    let get_curr_names = async () => {
      let res = await fetch("https://api.frankfurter.app/latest")
      let data = await res.json()

      setCurrNames(Object.keys(data.rates))
    }
    get_curr_names()

  }, [])

  useEffect(() => {
    const convert = async () => {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currFrom}&to=${currTo}`
      );
      const data = await res.json();
      setConverted(data.rates[currTo]);
    }

    if (currFrom === currTo) {
      alert("Same curreny")
      return
    }
      convert();
  }, [amount, currFrom, currTo]);

  let setTheAmount = (value) => {
    if(value != 0 || value > 0){
      setamount(parseFloat(value))
    }
    else{
      setamount(1)
    }
  }


  return (
    <>
      <section className="main-section">
        <div className="content pt-5 pb-5">

          <h4 className="fs-5">currency converter</h4>

          <div className="convert-section">
            <input type="text" className="form-control form-control-lg text-center mb-4" placeholder="Enter amount" onChange={(e) => setTheAmount(e.target.value)} />
            
            <div className="currencies pt-4">
              <div className="indicator">
                <p>from</p>
                <p>to</p>                
              </div>
              
              <div className="currency">
                <select className="form-select" value={currFrom} onChange={(e) => setCurrFrom(e.target.value)}>
                  {
                    currNames.map((e, index) => (
                      <option value={e} key={index}>{e}</option>
                    ))
                  }
                </select>

                <i className="ms-4 bi bi-arrow-left-right align-self-bottom me-4"></i>

                <select className="form-select" value={currTo} onChange={(e) => setCurrTo(e.target.value)}>
                  {
                    currNames.map((e, index) =>(
                      <option value={e} key={index}>{e}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <h5 className="mt-5 text-center pt-3 pb-3 bg-success text-light rounded-1">{amount.toLocaleString()} {currFrom} <i className="ms-3 bi bi-arrow-left-right me-3"></i> {converted.toLocaleString()} {currTo}</h5>

          </div>

        </div>
      </section>
    </>
  );
};

export default App;