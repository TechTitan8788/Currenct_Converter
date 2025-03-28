import { useState } from "react"; 
import { InputBox } from "./components"; 
import useCurrencyInfo from "./hooks/useCurrencyInfo"; 

function App() {
  // Defining state variables using useState hook
  const [amount, setAmount] = useState(0); //it  Stores the input amount.
  const [from, setFrom] = useState("usd"); // Stores the currency from which to convert.
  const [to, setTo] = useState("inr"); // Stores the currency to which to convert.
  const [convertedAmount, setConvertedAmount] = useState(0); // Stores the converted amount.

  const currencyInfo = useCurrencyInfo(from); // Fetching exchange rates for the selected 'from' currency.

  const options = Object.keys(currencyInfo); // Getting the list of available currencies.

  // Function to swap the 'from' and 'to' currencies
  const swap = () => {
    setFrom(to); // Swap 'from' currency with 'to' currency.
    setTo(from); // Swap 'to' currency with 'from' currency.
    setConvertedAmount(amount); // Set converted amount to input amount.
    setAmount(convertedAmount); // Swap the amount values.
  };

  // Function to convert the currency
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]); // Convert amount using exchange rate.
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
     <h1 class="px-4 text-center text-black text-4xl font-bold mb-[4.5rem] shadow-lg bg-white/30 backdrop-blur-md rounded-full">
  Currency Converter
</h1>

        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          {/* Form to handle currency conversion */}
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevents the default form submission.
              convert(); // Calls the convert function.
            }}
          >
            <div className="w-full mb-1">
              {/* Input box for 'From' currency selection */}
              <InputBox
                label="From"
                amount={amount} // Passes the amount state.
                currencyOptions={options} // Provides available currency options.
                onCurrencyChange={(currency) => to(amount)} // Updates amount when currency changes.
                selectCurrency={from} // Sets the selected currency.
                onAmountChange={(amount) => setAmount(amount)} // Updates amount on input change.
              />
            </div>
            <div className="relative w-full h-0.5">
              {/* Swap button to exchange currency selections */}
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap} // Calls the swap function.
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              {/* Input box for 'To' currency selection */}
              <InputBox
                label="To"
                amount={convertedAmount} // Displays the converted amount.
                currencyOptions={options} // Provides available currency options.
                onCurrencyChange={(currency) => setTo(currency)} // Updates the selected currency.
                selectCurrency={to} // Sets the selected currency.
                amountDisable // Disables the input field as it's auto-calculated.
              />
            </div>
            {/* Submit button to trigger conversion */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}{" "}
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App; 