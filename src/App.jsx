import { useEffect, useState } from 'react'
import axios from "axios";
import NavBar from './components/NavBar'
import Weather from './pages/Weather'
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './pages/About';
import ForecastPage from './pages/ForecastPage';
// import WindPage from './pages/WindPage';
import Login from './pages/Login';
import Signup from './pages/Signup';




function App({
  weather,
  setWeather,
  forecast,
  setForecast,
}) {


  const [loading, setLoading] = useState(false);
  const [aqi, setAqi] = useState(null);



  return (


    <Router>
      <div>
        <NavBar />


        <Routes>

          <Route path="/" element={<Weather/>}/>
          <Route path="/about" element={<About />} />
          <Route
            path="/forecast"
            element={
              <ForecastPage
              />
            }
          />
          <Route
  // path="/wind"
  // element={<WindPage />}
/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>




        </Routes>
        <Footer />
      </div>
    </Router>


  )
}



export default App
