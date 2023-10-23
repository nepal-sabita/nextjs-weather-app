const APIKEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const ApiUrl = "https://api.openweathermap.org/data/2.5";


const getWeatherData = async (city: string,latitude?:number,longitude?:number): Promise<any> => {
  //error handling
  try {
    const response = await fetch(`${ApiUrl}/forecast?&q=${city}&lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKEY}`);
    
   
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data", error);
    throw error;
  }
};


export default getWeatherData;
