import React, { useState } from 'react';
import { Observer } from 'mobx-react';
import weatherStore from '../stores/store';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import styles from '../styles/Home.module.css';
import SearchItems from '../components/SearchItems';
import getWeatherData from './api/apiweather';
import getCurrentData from './api/currentapi';
import Image from '../public/images/weatherCloud.png';


const Index: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [fiveDaysWeatherData, setFiveDaysWeatherData] = useState<any[]>([]);

  const handleCityChange = (newCity: string,newLatitude:number,newLongitude:number) => {
    setCity(newCity);

    // Fetch current weather and five days forecast when the city is changed
      
  };

  return (
    <div className={styles.AllElements}>
      <Head>
        <title>Weather Forecast</title>
      </Head>
      <img src='images/weatherCloud.png' alt='weatherCloud' className={styles.weatherCloud}/>
      <h1 className={styles.h1}>Weather Forecast</h1>
      <SearchItems onCityChange={handleCityChange} />
      {/* {currentWeather && (
        <div className={styles.currentBox}>
        </div>
      )} */}
      {/* {fiveDaysWeatherData.length > 0 && (
        <div className={styles.forecastContainer}>
        </div>
      )} */}
    </div>
  );
};

export default Index;
