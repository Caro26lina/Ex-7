import React, { useState } from "react";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const N = parseFloat(loanTenure);

    if (!P || !annualRate || !N || P <= 0 || annualRate <= 0 || N <= 0) {
      alert("Please enter valid positive values for all fields.");
      return;
    }

    const R = (annualRate / 12) / 100;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emiValue * N;
    const interestPaid = totalAmount - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(interestPaid.toFixed(2));
  };

  return (
    <div className="app">
      <div className="calculator-container">
        <h2> EMI Calculator</h2>

        <div className="input-group">
          <label>Loan Amount</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
          />
        </div>

        <div className="input-group">
          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter annual interest rate"
          />
        </div>

        <div className="input-group">
          <label>Loan Tenure (in months)</label>
          <input
            type="number"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            placeholder="Enter loan tenure"
          />
        </div>

        <button className="btn" onClick={calculateEMI}>
          Calculate EMI
        </button>

        {emi && (
          <div className="result">
            <p><strong>Monthly EMI:</strong> ₹{emi}</p>
            <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

