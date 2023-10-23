import { makeObservable, observable, action } from 'mobx';

class WeatherStore {
  city:string = '';
  currentWeatherData:any = null;
  fiveDaysWeatherData:any = [];

  constructor() {
    makeObservable(this, {
      city: observable,
      currentWeatherData: observable,
      fiveDaysWeatherData: observable,
      setCity: action,
      setCurrentWeatherData: action,
      setFiveDaysWeatherData: action,
    });
  }

  setCity(city:any) {
    this.city = city;
  }

  setCurrentWeatherData(data:any) {
    this.currentWeatherData = data;
  }

  setFiveDaysWeatherData(data:any) {
    this.fiveDaysWeatherData = data;
  }
}

const weatherStore = new WeatherStore();
export default weatherStore;
