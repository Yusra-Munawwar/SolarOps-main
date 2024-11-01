import React from 'react';
import { useTheme, Box, Typography, useMediaQuery } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Sample data (you can update this with real data)
const data = {
  airQuality: { aqi: 75, description: "Moderate" },
  weather: { temperature: 30, description: "Sunny", humidity: "60%", windSpeed: "10 km/h" },
  solarGeneration: { solar: 150, wind: 30, fossilFuel: 60 },
  parking: { availableSpaces: 20, totalSpaces: 100 },
  mapCenter: [30.3753, 69.3451], // Coordinates for a map center
  parkingSpaces: [
    { position: [30.3753, 69.3451], name: "Solar Parking Lot 1" },
    { position: [30.2753, 69.3451], name: "Solar Parking Lot 2" }
  ]
};

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h4" sx={{ marginBottom: "1rem", fontWeight: "bold" }}>
        SolarOps Dashboard Overview
      </Typography>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* Air Quality */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <img src="/images/wind.png" alt="Air Quality" style={{ width: 100, height: 100, marginBottom: '1rem' }} />
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Air Quality Index
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.secondary[300] }}>
            {data.airQuality.aqi}
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary[200] }}>
            {data.airQuality.description}
          </Typography>
        </Box>

        {/* Weather */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <img src="/images/cloud.png" alt="Weather" style={{ width: 100, height: 100, marginBottom: '1rem' }} />
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Weather
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.secondary[300] }}>
            {data.weather.temperature} °C
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary[200] }}>
            {data.weather.description} | Humidity: {data.weather.humidity} | Wind Speed: {data.weather.windSpeed}
          </Typography>
        </Box>

        {/* Solar Generation Pie Chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Solar Generation Breakdown
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={Object.keys(data.solarGeneration).map(key => ({ name: key, value: data.solarGeneration[key] }))} dataKey="value" outerRadius={60} label>
                <Cell fill="#8884d8" />
                <Cell fill="#82ca9d" />
                <Cell fill="#ffc658" />
              </Pie>
              <Tooltip contentStyle={{ fontSize: '12px', backgroundColor: '#fff', borderColor: '#ddd' }} />
              <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '13px', paddingTop: '200px' }} />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Parking Availability */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Parking Availability
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.secondary[200] }}>
            Available Spaces: {data.parking.availableSpaces} / Total Spaces: {data.parking.totalSpaces}
          </Typography>
        </Box>

        {/* Parking Map */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Parking Locations
          </Typography>
          <MapContainer center={data.mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© OpenStreetMap contributors'
            />
            {data.parkingSpaces.map((space, index) => (
              <Marker key={index} position={space.position}>
                <Popup>{space.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
n                                                                                                                                                                                                      
