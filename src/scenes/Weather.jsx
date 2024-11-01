import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import WeatherCharts from "./WeatherCharts";
import "./Weather.css";

const WeatherDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");

  const [Data, setData] = useState({ list: [], city: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedData, setSelectedData] = useState([]); // State for selected day's data
  const [dayClicked, setDayClicked] = useState(false); 

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = "642979f5ee631edab3c8bb7dbbffaa6d"; 
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}`
        );

        setData(response.data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Error fetching weather data.");
      } finally {
        setLoading(false);
      }
    };

    if (lat && lng) {
      fetchWeather();
    } else {
      setError("Latitude and Longitude are required.");
      setLoading(false);
    }
  }, [lat, lng]);

  if (loading) return <div className="loading-container"><div className="loading-spinner"></div><div className="loading-text">Loading...</div></div>;
  if (error) return <div>{error}</div>;

  const CurrTemp = Data.list[0]?.main.temp; // Current temperature
  const Icon = Data.list[0]?.weather[0]?.icon; // Current weather icon

  const handleDayClick = (index) => {
    // Calculate the starting point for the day's forecast
    const start = index * 8;
    const selected = Data.list.slice(start, start + 8);
    setSelectedData(selected);
    setDayClicked(true); 

  };

  return (
    <div className="main">
      <div className="center">
        <div className="content">
          <div className="city-temp">
            <h1 className="city">{Data.city?.name}, {Data.city?.country}</h1>
            <div>
              <h1 className="curTemp">{(CurrTemp - 273.15).toFixed(0)}°C</h1>
            </div>
            <div className="main-icon flex flex-col items-center -mt-4">
              <img
                draggable={false}
                src={`http://openweathermap.org/img/wn/${Icon.slice(0, 2)}d@2x.png`}
                width={50}
                alt="Weather Image"
                className="mx-auto"
              />
              <div className="labell text-sm font-semibold">{Data.list?.[0].weather[0].description}</div>
            </div>
          </div>

          <div className="forecast">
            <div className="text-lg"><strong>TODAY'S FORECAST</strong></div>
            <div className="horizontal">
              {Data.list?.slice(0, 8).map((item, index) => (
                <div className="today-item" key={index}>
                  <div className="time">{item.dt_txt.slice(11, 16)}</div>
                  <div className="icon">
                    <img
                      draggable={false}
                      id="imageBox"
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon.slice(0, 2)}d@2x.png`}
                      width={50}
                      alt=""
                    />
                  </div>
                  <div className="temper">{(item.main.temp - 273.15).toFixed(0)}°C</div>
                </div>
              ))}
            </div>
          </div>

          <div className="details ">
            <div className="text-lg"><strong>MORE INFORMATION ON TODAY'S WEATHER</strong></div>
            <div className="items">
              <div className="detail-item">
                <div className="detail-name">Description</div>
                <div className="detail-value">{Data.list?.[0].weather[0].description}</div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Humidity</div>
                <div className="detail-value">{Data.list?.[0].main.humidity}%</div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Feels like</div>
                <div className="detail-value">{(Data.list?.[0].main.feels_like - 273.15).toFixed(0)}°C</div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Pressure</div>
                <div className="detail-value">{Data.list?.[0].main.pressure} mb</div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Wind Speed</div>
                <div className="detail-value">{Data.list?.[0].wind.speed} m/s</div>
              </div>
              <div className="detail-item">
                <div className="detail-name">Visibility</div>
                <div className="detail-value">{Data.list?.[0].visibility} m</div>
              </div>
            </div>
          </div>

          <div className="summary text-base">
            <div className="text-lg text-center"><strong>5-DAY FORECAST</strong></div>
            {Data.list?.map((item, index) => {
              if (index % 8 === 0) {
                return (
                  <div className="forecast-item mt-3" key={index} onClick={() => handleDayClick(index / 8)}>
                    <div className="date">{new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long" })}</div>
                    <div className="icon">
                      <img
                        draggable={false}
                        id="imageBox"
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon.slice(0, 2)}d@2x.png`}
                        width={50}
                        alt=""
                      />
                    </div>
                    <div className="type">{item.weather[0].main}</div>
                    <div className="temp-range">
                      <div className="max-temp">
                        <i className="fas fa-arrow-up"></i>
                        {(item.main.temp_max - 273.15).toFixed(2)}°C
                      </div>
                      <div className="min-temp">
                        <i className="fas fa-arrow-down"></i>
                        {(item.main.temp_min - 273.15).toFixed(2)}°C
                      </div>
                    </div>
                  </div>
                );
              }
              return null; // To avoid rendering undefined elements
            })}
          </div>
          {!dayClicked && (
            <div className="text-lg text-right">
              Please click on the days for weather charts
            </div>
          )}        </div>
      </div>
      <div className="mt-10"> {selectedData.length > 0 && <WeatherCharts selectedData={selectedData} />}</div>

    </div>

  );
};

export default WeatherDetails;
