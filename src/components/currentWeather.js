import React, { useState } from 'react';
import '../components/currentWeather.css';

function CurrentWeather() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchLocation = () => {
        if (!location) return;

        const apiKey = '7d8ea7d8e5a391ae9352e4fb5a1d9e3c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=Es&appid=${apiKey}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ubicación no encontrada');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError('Ubicación no encontrada');
                setLoading(false);
                console.error('Error fetching weather data:', error);
            });
    };
    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            searchLocation();
        }
    };
    return (
        <div className="App">
            <div className="search">
                <input
                    value={location}
                    type="text"
                    onChange={event => setLocation(event.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ingrese Ubicación"
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p className="city">{data.name}</p>
                    </div>
                    <div className="temp">
                        <h1>{data.main && `${Math.round(data.main.temp - 273.15)}°C`}</h1>
                        {data.weather && data.weather[0].icon && (
                            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon" />
                        )}
                    </div>
                    <div className="description">
                        <p>{data.weather && data.weather[0].description}</p>
                    </div>
                </div>
                {loading ? (
                    <div>Cargando...</div>
                ) : (
                    <>
                        {error && <div>{error}</div>}
                        {Object.keys(data).length !== 0 && (
                            <div className="left">
                                <div className="feels">
                                    <p className="bold">{data.main && `${Math.round(data.main.feels_like - 273.15)}° C`}</p>
                                    <p>Promedio</p>
                                </div>
                                <div className="humidity">
                                    <p className="bold">{data.main && `${data.main.humidity}%`}</p>
                                    <p>Humedad</p>
                                </div>
                                <div className="wind">
                                    <p className="bold">{data.wind && `${data.wind.speed} m/s`}</p>
                                    <p>Viento</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default CurrentWeather;

