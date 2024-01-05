import React, { useState } from "react";
import searchicon from "./Components/Assets/search.png";
import cloud from "./Components/Assets/cloudy.png";
import rain from './Components/Assets/rainy-day.png'
import sunny from './Components/Assets/sunny.png'
import snow from './Components/Assets/snowflake.png'
import humidity from './Components/Assets/humidity.png';
import wind from './Components/Assets/wind.png'
import "./App.css";
function App() {

    let apiKey = 'eff26126a9b02ec7247ac3c31ea36787';
    const [wicon,setwicon] = useState(cloud)

    const search = async() =>{
      const element = document.getElementsByClassName('cityInput')
      if(element[0].value === ''){
        return 0;
      }
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${apiKey}&units=metric`

      let response = await fetch(url);
      let data = await response.json();

      const temperature = document.getElementsByClassName('weather-temp')
      const location = document.getElementsByClassName('weather-location')
      const humidity = document.getElementsByClassName('humidity-present')
      const windspeed = document.getElementsByClassName('wind-speed')

      temperature[0].innerHTML = data.main.temp+"&deg;C"
      location[0].innerHTML = data.name
      humidity[0].innerHTML = data.main.humidity+'%'
      windspeed[0].innerHTML = data.wind.speed+'km/hr'

      if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
        setwicon(sunny)
      }
      else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setwicon(cloud)
      }
      else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
        setwicon(rain)
      }
      else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setwicon(rain)
      }
      else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
        setwicon(rain)
      }
      else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
        setwicon(snow)
      }
      else{
        setwicon(sunny)
      }

    }

  return (
    <div className="container">
      <div className="topbar">
        <input type="text" placeholder="Search" className="cityInput"/>
        <div className="search" onClick={()=>{search()}}>
          <img src={searchicon} alt="nothing found..." />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="nothing found..." />
      </div>


      <div className="weather-temp">24</div>
      <div className="weather-location">London</div>


      <div className="data-container">
        <div className="element">
          <img className="icon" src={humidity} alt=""/>
          <div className="data">
            <div className="humidity-present">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img className="icon" src={wind} alt=""/>
          <div className="data">
            <div className="wind-speed">20km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
