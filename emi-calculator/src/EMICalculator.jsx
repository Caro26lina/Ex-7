import React, { useState } from 'react';
import './EMICalculator.css'; // Import the CSS file

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [annualInterest, setAnnualInterest] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    // Input validation
    if (!loanAmount || !annualInterest || !loanTenure) {
      alert('Please fill out all fields.');
      return;
    }
    if (loanAmount <= 0 || annualInterest <= 0 || loanTenure <= 0) {
      alert('Please enter positive values.');
      return;
    }

    const P = parseFloat(loanAmount);
    const R = parseFloat(annualInterest) / 12 / 100; // monthly interest rate
    const N = parseInt(loanTenure);

    // EMI Formula
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    const total = emiValue * N;
    const interest = total - P;

    setEmi(emiValue.toFixed(2));
    setTotalAmount(total.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  return (
    <div className="emi-container">
      <div className="emi-card">
        <h2 className="emi-title">💰 EMI Calculator</h2>

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
            value={annualInterest}
            onChange={(e) => setAnnualInterest(e.target.value)}
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

        <button className="calculate-btn" onClick={calculateEMI}>
          Calculate EMI
        </button>

        {emi && (
          <div className="result-section">
            <h3>Calculation Summary 📊</h3>
            <p>
              <strong>Loan Amount:</strong> ₹{loanAmount}
            </p>
            <p>
              <strong>Monthly EMI:</strong> ₹{emi}
            </p>
            <p>
              <strong>Total Interest:</strong> ₹{totalInterest}
            </p>
            <p>
              <strong>Total Amount to be Paid:</strong> ₹{totalAmount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculator;
