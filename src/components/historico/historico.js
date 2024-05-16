import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './historico.css';
import { FaWind } from "react-icons/fa";

function Historico(data) {
  return (
    <div className="container2">
      <div className="row">
        {data.datos.map(objeto => (
          <div className="day col-2">
            <div className='icon-temp'>
              {objeto.weather && objeto.weather[0].icon && (
                <img src={`http://openweathermap.org/img/wn/${objeto.weather[0].icon}.png`} alt="Weather Icon" />
              )}
            </div>
            <div className='temp'>
              <h1>{objeto.main && `${Math.round(objeto.main.temp - 273.15)}°C`}</h1>
            </div>
            <div className='description'>
              <p>{objeto.weather && objeto.weather[0].description}</p>
            </div>
            <div className='wind'>
              <FaWind style={{ fontSize: '30px' }}/>
              <p>{objeto.wind.speed}</p>
            </div>
            <div className='date'>
              <p>{objeto.dt_txt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Historico