import React from 'react';
import styles from '../styles/CurrentWeather.module.css'; 

interface CurrentWeatherComponentProps {
  weatherData: any; 
}

const CurrentWeatherComponent: React.FC<CurrentWeatherComponentProps> = ({ weatherData }) => {
  function getDayOfWeek(date:any) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }

  return (
    <div className={styles.currentBox}>
      <h3>{getDayOfWeek(new Date(weatherData.dt * 1000))}</h3>
      <h3 className={styles.weatherInfo}>{weatherData.weather[0].description.toUpperCase()}</h3>
      <img
        className={styles.weatherIcon}
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        alt={weatherData.weather[0].description}
      />
      <div className={styles.weatherInfoRow}>
        <h3 className={styles.weatherInfo}>Temperature: {weatherData.main.temp}&deg;C</h3>
        <h3 className={styles.weatherInfo}>Min-Temperature: {weatherData.main.temp_min}&deg;C</h3>
        <h3 className={styles.weatherInfo}>Max-Temperature: {weatherData.main.temp_max}&deg;C</h3>
      </div>
      <div className={styles.weatherInfoRow}>
        <h3 className={styles.weatherInfo}>WindSpeed: {weatherData.wind.speed} km/h</h3>
        <h3 className={styles.weatherInfo}>Humidity: {weatherData.main.humidity}%</h3>
      </div>
    </div>
  );
};

export default CurrentWeatherComponent;
