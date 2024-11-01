import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import '../scenes/Weather.css';

const WeatherCharts = ({ weatherData }) => {
    const formatDataForChart = (data, parameter) =>
        data.map((entry) => ({
            x: entry.dateTime,
            y: entry[parameter],
        }));

    const chartConfig = {
        margin: { top: 50, right: 110, bottom: 50, left: 60 },
        axisBottom: { tickRotation: -45 },
        colors: { scheme: 'set1' },
        pointSize: 5,
        pointBorderWidth: 2,
        pointBorderColor: { from: 'serieColor' },
        useMesh: true,
        tooltip: {
            enable: true,
            render: ({ point }) => (
                <div style={{ color: point.serieColor }}>
                    <strong>{point.data.xFormatted}</strong> : {point.data.yFormatted}
                </div>
            ),
        },
    };

    return (
        <div className="weather-charts">
            {['temperature', 'feelsLike', 'humidity', 'windSpeed', 'seaLevel', 'clouds', 'rain'].map((parameter) => (
                <div key={parameter} className="chart-card">
                    <h3>{parameter.charAt(0).toUpperCase() + parameter.slice(1)}</h3>
                    <ResponsiveLine
                        data={[{ id: parameter, data: formatDataForChart(weatherData, parameter) }]}
                        {...chartConfig}
                    />
                </div>
            ))}
        </div>
    );
};

export default WeatherCharts;
