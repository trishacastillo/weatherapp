import React, { useState } from "react";
function App() {

  const APIKey='79ddb67ce6fa53f9c45ddcc47004bc6e';
  const [weatherData, setWeatherData]= useState([{}]);
  const [city, setCity]=useState("");
  const [isPending, setIsPending] = useState(true);

  const getWeather=(event)=>{
    try{
      if (event.key==="Enter"){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&APPID='+APIKey).then(
          response=>response.json()
        ).then(
          data=>{
            setIsPending(false);
            setWeatherData(data)
          }
        )
      }
    } catch(e) {
      console.log('error: ', e);  
  }
}

  
  return (
    <div className="App">
      <div className="view">
      <div className="user-input">
        <input type='text' 
               placeholder='Enter City...'
               onChange={e=>setCity(e.target.value)}
               value={city}
               onKeyPress={getWeather}/>
        </div>

      
        {typeof weatherData.main==='undefined' ? (
          <div className="fixed"> 
            <div className="welcome-box ">
             <h2>Welcome to Weather App</h2>
             <p>Kindly type above the city you want.
             And we gonna display the currently weather.</p>
             <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="weather" />

             {weatherData.cod==='404' ? (
                   <h2 className="error-msg">Opps! City not found.</h2>
                   ):(<></>)}  
             </div>
          </div>
           ):(
          
          <div className="container fixed">
             <h2>{weatherData.name} , {weatherData.sys.country}</h2>
             <p>{new Date().toLocaleString() + ""}</p>
             <p> {isPending ? (<></> ):(<img src={"https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"} alt="" />)} </p>
             <h2>{Math.round(weatherData.main.temp)}&#176;F </h2>
             <p>{weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
            
            
          </div>
            
           )}
    
    <hr/>
    <footer>
    <p>Made with 💛 by Trisha Castillo v2022</p>
    </footer>
    </div>
    </div>
    
  );
}

export default App;
