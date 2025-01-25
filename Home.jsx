import React, { useEffect } from 'react';
import './style.css'
import axios from 'axios';
import { useState } from 'react';


function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'Abuja',
    humidity: 10,
    speed: 2,
    image: '/img/cloudImg.png'
  })

  const [name, setName] = useState('')
  const [error, setError] = useState('')


  const handleClick = () => {
    if(name !== '') {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=08af80e96eb5317037d1298bef9b04de&&units=metric`
      axios.get(apiUrl)
      .then(res => {
        let imagePath = '';
        if(res.data.weather[0].main === 'Clouds') {
          imagePath = '/img/cloudImg.png'
        } else if(res.data.weather[0].main === 'Rain') {
          imagePath = '/img/rainImg.png'
        } else if(res.data.weather[0].main === 'Clear') {
          imagePath = '/img/sunnyImg.png'
        } else if(res.data.weather[0].main === 'Drizzle') {
          imagePath = '/img/drizzleImg.png'

         }else if(res.data.weather[0].main === 'Mist') {
          imagePath = '/img/mistImg.png'
         }else {
          imagePath = '/img/cloudImg.png'
        }
        console.log(res.data);
        setData({...data, celcius: res.data.main.temp, name: res.data.name, 
          humidity: res.data.main.humidity, speed: res.data.wind.speed,
          image: imagePath})
          setError('');

      })
      .catch(err => {
        if(err.response.status === 404) {
          setError('City not found')
      }else {
      }
        console.log(err);
    })
  }
}
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter City Name" onChange={e => setName(e.target.value)} />
          <button>
            <img src="/img/searchImg.png" onClick={handleClick} alt="search icon" />
          </button>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
        <div className="winfo">
            <img src={data.image} alt="cloud image" className='icon' />
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className="details">
                <div className="col">
                    <img src="/img/humidityImg.png" alt="" />
                </div>
               <div className='humidity'>
               <p>{Math.round(data.humidity)}%</p>
               <p>Humidity</p>
               </div>

                <div className="col">
            <img src="/img/windImg.png" alt="" />
                </div>
               <div className='wind'>
               <p>{Math.round(data.speed)}km/h</p>
               <p>Wind</p>
               </div>
            </div>

            </div>
           
            </div>
        </div>
  )
  
}

export default Home;