import React, { useState } from 'react';
import "./Css/TemperatureConverter.css";

const TemperatureConverter = () => {
  // State variables to manage input values and selected units
  const [temperature, setTemperature] = useState('');
  const [originalUnit, setOriginalUnit] = useState('Celsius');
  
  // State variable to store converted temperature values
  const [convertedValues, setConvertedValues] = useState({
    Celsius: '',
    Fahrenheit: '',
    Kelvin: '',
  });

  // Event handler for temperature input changes
  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  // Event handler for unit selection changes
  const handleUnitChange = (e) => {
    setOriginalUnit(e.target.value);
    convertedValues.Celsius='';
    convertedValues.Fahrenheit='';
    convertedValues.Kelvin='';
  };

  // Function to perform temperature conversion
  const convertTemperature = () => {
    let input = parseFloat(temperature);

    // Check if the input is a valid number
    if (isNaN(input)) {
      alert('Please enter a valid temperature value!');
      return;
    }

    // Initialize converted temperature values
    let celsius = 0;
    let fahrenheit = 0;
    let kelvin = 0;

    // Perform temperature conversion based on the selected unit
    switch (originalUnit) {
      case 'Celsius':
        fahrenheit = (celsius * 9/5) + 32;
        kelvin = celsius + 273.15;
        break;
      case 'Fahrenheit':
        celsius = (temperature - 32) * 5/9;
        kelvin = celsius + 273.15;
        break;
      case 'Kelvin':
        celsius = temperature - 273.15;
        fahrenheit = (celsius * 9/5) + 32;
        break;
      default:
        break;
    }

    // Update state with the converted values
    setConvertedValues({
      Celsius: celsius.toFixed(2),
      Fahrenheit: fahrenheit.toFixed(2),
      Kelvin: kelvin.toFixed(2),
    });
  };

  // Conditionally render temperature values based on the original unit
  let convertedDisplay;
  if (originalUnit === 'Celsius') {
    convertedDisplay = (
      <div className='converted-values'>
        <p>Fahrenheit: {convertedValues.Fahrenheit}</p>
        <p>Kelvin: {convertedValues.Kelvin}</p>
      </div>
    );
  } else if (originalUnit === 'Fahrenheit') {
    convertedDisplay = (
      <div className='converted-values'>
        <p>Celsius: {convertedValues.Celsius}</p>
        <p>Kelvin: {convertedValues.Kelvin}</p>
      </div>
    );
  } else {
    convertedDisplay = (
      <div className='converted-values'>
        <p>Celsius: {convertedValues.Celsius}</p>
        <p>Fahrenheit: {convertedValues.Fahrenheit}</p>
      </div>
    );
  }

  // JSX content for the TemperatureConverter component
  return (
    <div className="converter-container">
      <div className="converter-box">
        <h1 className="converter-header">Temperature Converter</h1>
        <label className="converter-label">
          Enter Temperature:
          <input type="number" value={temperature} onChange={handleTemperatureChange} />
        </label>
        <br />
        <label className="converter-label">
          Choose Unit:
          <select className="converter-select" value={originalUnit} onChange={handleUnitChange}>
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Kelvin">Kelvin</option>
          </select>
        </label>
        <br />
        <button className="converter-button" onClick={convertTemperature}>Convert</button>
        <br />
        <h2 className="converter-subheader">Converted Values:</h2>
        {convertedDisplay}
      </div>
    </div>
  );
};

export default TemperatureConverter;
