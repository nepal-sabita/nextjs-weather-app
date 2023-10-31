import React, { useState, ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import weatherStore from '../stores/store';
import styles from '../styles/SearchItems.module.css';
import getWeatherData from '../pages/api/apiweather';
import { GetServerSideProps } from 'next';
import getCurrentData from '../pages/api/currentapi';
import CurrentWeatherComponent from './CurrentWeatherComponent';
import FiveDaysForecastComponent from './FiveDaysForecastComponent';
import validateCity from'./CityValidation';

interface SearchItemsProps {
  onCityChange: (city: string, latitude: number, longitude: number) => void;//props
}

const SearchItems: React.FC<SearchItemsProps> =observer( ({ onCityChange }) => {
  const [city, setCity] = useState<string>('');
  const [currentweatherData, setCurrentWeatherData] = useState<any>(null);
  const [fiveDaysWeatherData, setFiveDaysWeatherData] = useState<any[]>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  
  
//getting user current location i.e. geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          onCityChange(city, position.coords.latitude, position.coords.longitude);
          fetchData(city, position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
//getting all data()

  const fetchData = (city: string, latitude: number, longitude: number) => {
    //getting fivedays weather
    getWeatherData(city, latitude, longitude)
      .then(data => {
        const nextFiveDaysData = data.list.filter((item: any) => {//filtering the data inorder to get data according to local time
          const itemDate = new Date(item.dt_txt);
          const currentDate = new Date();
          const nextFiveDays = new Date();
          nextFiveDays.setDate(currentDate.getDate() + 5);

          // Filtering out 3-hour interval data to keep daily data for 5 days
          return itemDate.getHours() ===  6 && 18 && itemDate > currentDate && itemDate <= nextFiveDays;
        });

        weatherStore.setFiveDaysWeatherData(nextFiveDaysData);//process fivedays weather
      })
      .catch(error => {
        console.error('Error getting weather data:', error);
      });
//getting current weather
    getCurrentData(city, latitude, longitude)
      .then(dataCurrent => {
        // Process current weather data
        weatherStore.setCurrentWeatherData(dataCurrent);
      })
      .catch(error => {
        console.error('Error getting current weather data:', error);
      });
      
  };
//function for  search button
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);

  };
  //fetching only valid city for user validation
//function foe searching city
  const handleSearch =async () => {
    if (city.trim() !== '') {
      const isValidCity=await validateCity(city);
      if (isValidCity) {
        fetchData(city, latitude, longitude);
        onCityChange(city, latitude, longitude);
      } else {
        // Display an error message and prevent further actions
        console.log('Invalid city. Please enter a valid city name.');
        alert('The city is invalid. Please enter a valid city name');
      }
  }
      else {
      console.log('Please enter a valid city name');
      alert('Please enter a valid city');
  }
  };
  //render
  return (
    <div className={styles.allWeather}>
    <div className={styles.searchBox}>
      <label htmlFor='search'>
        <input
        className={styles.search}
          type='text'
          value={city}
          onChange={handleInput}
          placeholder='Search location'
          id='search'
        />
      </label>
      <label htmlFor='searchButton'>
        <button onClick={handleSearch} id={styles.searchButton}>
          Search
        </button>
      </label>
      </div>
        <h1>Current Weather {city.toUpperCase()}</h1>
        <div className={styles.currentBox}>
        {/* fetching components using props or by passing props */}
        {weatherStore.currentWeatherData ? <CurrentWeatherComponent weatherData={weatherStore.currentWeatherData} /> : <p>Loading weather data...</p>}
      </div>
      <h1>Five Days Forecast {city.toUpperCase()}</h1>
      <div className={styles.container}>
        {weatherStore.fiveDaysWeatherData.length > 0 ? (
          <FiveDaysForecastComponent fiveDaysWeatherData={weatherStore.fiveDaysWeatherData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
   
    </div>
  );
});

export default SearchItems;
