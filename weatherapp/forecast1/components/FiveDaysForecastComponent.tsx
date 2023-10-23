import React from 'react';
import styles from '../styles/FiveDaysForecast.module.css';

interface FiveDaysForecastComponentProps {
  fiveDaysWeatherData: any[]; // Replace 'any[]' with the appropriate type for your weather data
}

const FiveDaysForecastComponent: React.FC<FiveDaysForecastComponentProps> = ({ fiveDaysWeatherData }) => {
  // passsinf fiveDays WeatherData as props
  function getDayOfWeek(date:any) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }
  return ( 
    <div className={styles.flexContainer}>
      {fiveDaysWeatherData.map((dayData, index) => (
        <div key={index} className={styles.flexItems}>
          <p>Date: {new Date(dayData.dt * 1000).toLocaleDateString()}-{getDayOfWeek(new Date(dayData.dt * 1000))}</p>
          <h3>{dayData.weather[0].description.toUpperCase()}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`}
            alt={dayData.weather[0].description}
          />
          <h3>Temperature: {dayData.main.temp}&deg;C</h3>
          <h3>Humidity: {dayData.main.humidity}%</h3>
          <h3>Wind Speed: {dayData.wind.speed} km/h</h3>
          <h3>Min-Temperature: {dayData.main.temp_min}&deg;C</h3>
          <h3>Max-Temperature: {dayData.main.temp_max}&deg;C</h3>
        </div>
      ))}
    </div>
  );
};

export default FiveDaysForecastComponent;
