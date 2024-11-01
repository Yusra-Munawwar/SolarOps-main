import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import './Weather.css';

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    console.log('Tooltip Payload:', payload);
    
    const { name, value } = payload[0].payload;
    const formattedValue = typeof value === 'number' ? value.toFixed(2) : 'N/A';

    return (
      <div className="custom-tooltip">
        <span className="parameter-name" style={{ backgroundColor: payload[0].stroke }}>
          {name}
        </span>
        <h4 className="label">{`${formattedValue}`}</h4>
      </div>
    );
  }
  return null;
};

const WeatherCharts = ({ selectedData }) => {
  const [currentParameter, setCurrentParameter] = useState('');
  const date = new Date(selectedData[0].dt_txt).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Prepare data for each chart
  const temperatureData = selectedData.map(item => ({
    time: item.dt_txt.slice(11, 16),
    value: parseFloat((item.main.temp - 273.15).toFixed(2)),
    name: 'Temperature (°C)',
  }));

  const windSpeedData = selectedData.map(item => ({
    time: item.dt_txt.slice(11, 16),
    value: item.wind.speed,
    name: 'Wind Speed (m/s)',
  }));

  const humidityData = selectedData.map(item => ({
    time: item.dt_txt.slice(11, 16),
    value: item.main.humidity,
    name: 'Humidity (%)',
  }));

  const pressureData = selectedData.map(item => ({
    time: item.dt_txt.slice(11, 16),
    value: item.main.pressure,
    name: 'Pressure (mb)',
  }));

  const visibilityData = selectedData.map(item => ({
    time: item.dt_txt.slice(11, 16),
    value: item.visibility,
    name: 'Visibility (m)',
  }));

  const handleMouseEnter = (name) => {
    setCurrentParameter(name);
  };

  return (
    <div className='text-lg'>
      <h2 className="text-4xl font-bold text-center mb-3 text-yellow-100">Weather Charts</h2>
      <p className="text-center text-xl font-bold mb-5 text-gray-300">{date}</p>

      <div className="flex justify-center items-center">
        <ResponsiveContainer width="70%" height={300}>
        <h3 className='my-50 font-bold'>Temperature (°C)</h3>

          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              content={<CustomTooltip />} 
              onMouseEnter={() => handleMouseEnter('Temperature (°C)')} // Set the parameter name
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center items-center mt-12">
        <ResponsiveContainer width="70%" height={300}>
        <h3 className='my-50 font-bold'>Wind Speed (m/s)</h3>

          <LineChart data={windSpeedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              content={<CustomTooltip />} 
              onMouseEnter={() => handleMouseEnter('Wind Speed (m/s)')} 
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#387908" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center items-center mt-12">
        <ResponsiveContainer width="70%" height={300}>
        <h3 className='my-50 font-bold'>Humidity (%)</h3>

          <LineChart data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              content={<CustomTooltip />} 
              onMouseEnter={() => handleMouseEnter('Humidity (%)')} 
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center items-center mt-12">
        <ResponsiveContainer width="70%" height={300}>
        <h3 className='my-50 font-bold'>Pressure (mb)</h3>

          <LineChart data={pressureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              content={<CustomTooltip />} 
              onMouseEnter={() => handleMouseEnter('Pressure (mb)')} 
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center items-center mt-12">
        <ResponsiveContainer width="70%" height={300}>
        <h3 className='my-50 font-bold'>Visibility (m)</h3>

          <LineChart data={visibilityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              content={<CustomTooltip />} 
              onMouseEnter={() => handleMouseEnter('Visibility (m)')} 
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default WeatherCharts;
