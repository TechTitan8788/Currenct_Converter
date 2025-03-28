import React, { useId } from "react";

// InputBox Component: Used for entering an amount and selecting a currency
function InputBox({
  label, // Label text for the input field
  amount, // Value of the amount input field
  onAmountChange, // Function to handle changes in amount input
  onCurrencyChange, // Function to handle changes in currency selection
  currencyOptions = [], // List of available currency options
  selectCurrency = "usd", // Default selected currency
  amountDisable = false, // Boolean to disable amount input field
  currencyDisable = false, // Boolean to disable currency selection dropdown
  className = "", // Additional CSS classes for customization
}) {
  // Generate a unique ID for the input field
  const amountInputId = useId();

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      {/* Left section: Input field for amount */}
      <div className="w-1/2">
        {/* Label for the amount input field */}
        <label
          htmlFor={amountInputId}
          className="text-black/40 mb-2 inline-block"
        >
          {label}
        </label>
        {/* Input field to enter amount */}
        <input
          id={amountInputId} // Assign unique ID to input field
          className="outline-none w-full bg-transparent py-1.5"
          type="number" // Number input field
          placeholder="Amount" // Placeholder text
          disabled={amountDisable} // Disable input if amountDisable is true
          value={amount} // Current value of input field
          onChange={
            (e) => onAmountChange && onAmountChange(Number(e.target.value)) // Call onAmountChange if it exists
          }
        />
      </div>

      {/* Right section: Currency selection dropdown */}
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        {/* Label for currency dropdown */}
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        {/* Dropdown to select currency */}
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency} // Currently selected currency
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // Call onCurrencyChange if it exists
          disabled={currencyDisable} // Disable dropdown if currencyDisable is true
        >
          {/* Render available currency options dynamically */}
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
