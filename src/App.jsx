// import ButtonGradient from "./assets/svg/ButtonGradient";
// import Benefits from "./components/Benefits";
// import Collaboration from "./components/Collaboration";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import Pricing from "./components/Pricing";
// import Roadmap from "./components/Roadmap";
// import Services from "./components/Services";

// const App = () => {
//   return (
//     <>
//       <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
//         <Header />
//         <Hero />
//         <Benefits />
//         <Collaboration />
//         <Services />
//         <Pricing />
//         <Roadmap />
//         <Footer />
//       </div>

//       <ButtonGradient />
//     </>
//   );
// };

// export default App;

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import { themeSettings } from "./theme";

// Import components
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";

// Import dashboard components
import Layout from "./scenes/Layout";
import UserManual from "./scenes/UserManual";
import Admin from "./scenes/Admin";
// import Weather from "./scenes/PowerPrediction";
// import CO2Emission from "./scenes/CO2Emission";
// import TrafficFlowMap from "./scenes/Heatmap";
// import WaterUsage from "./scenes/Fault";
// import EnergyConsumption from "./scenes/EnergyConsumption";
// import ParkingAvailability from "./scenes/ParkingAvailability";
// import UserManual from "./scenes/UserManual";
import Monitoring from "./scenes/Monitoring";
import PowerPrediction from "./scenes/PowerPrediction";
import Visualizations from "./scenes/Visualizations";

import Fault from "./scenes/Fault";
import Faq from "./components/Faq"

import Login from "./components/Login/login";
import Register from "./components/SignUp/register";
import WeatherDetails from "./scenes/Weather";

import '@fortawesome/fontawesome-free/css/all.min.css';


// Landing page component
const LandingPage = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Faq />
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

// Define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route element={<Layout />}>
      <Route path="/dashboard" element={<UserManual />} />
        <Route path="/visualizations" element={<Visualizations />} />
        <Route path="/location/:id" element={<WeatherDetails/>} />
        <Route path="/powerprediction" element={<PowerPrediction />} />
        <Route path="/fault" element={<Fault />} />
        <Route path="/admin" element={<Admin />} />
  
      </Route>
      <Route path="/loginpage" element={<Login />} />
        <Route path="/registerpage" element={<Register />} />

    </>
  )
);

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

