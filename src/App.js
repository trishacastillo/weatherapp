import React, { useState } from "react";
function App() {

  const APIKey='79ddb67ce6fa53f9c45ddcc47004bc6e';
  const [weatherData, setWeatherData]= useState([{}]);
  const [city, setCity]=useState("");

  const getWeather=(event)=>{
    if (event.key==="Enter"){
      fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&APPID='+APIKey).then(
        response=>response.json()
      ).then(
        data=>{
          setWeatherData(data)
        }
      )
    }
  }
  return (
    <div className="App">
      <div className="user-input">
        <input type='text' 
               placeholder='Enter City...'
               onChange={e=>setCity(e.target.value)}
               value={city}
               onKeyPress={getWeather}/>
        </div>
        {typeof weatherData.main==='undefined' ? (
          <div>
             <p>Welcome</p>
          </div>
           ):(
          <div className="container">
            <p>{weatherData.name}</p>
            <p>{weatherData.sys.country}</p>
            <p>{Math.round(weatherData.main.temp)}&#176;F but feels like {Math.round(weatherData.main.feels_like)} &#176; F</p>
            <p>{weatherData.weather[0].main}</p>
            <p>Description {weatherData.weather[0].description}</p>

          </div>  
           )}

        {weatherData.cod==='404' ? (
          <p>Opps! City not found.</p>
        ):(<></>)}
               
      
      
      
    </div>
  );
}

export default App;
