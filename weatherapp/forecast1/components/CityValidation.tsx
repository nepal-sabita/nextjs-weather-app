const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const validateCity = async (city: string): Promise<boolean> => {
    const updatedCity = city.trim().toLowerCase();
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const data = await response.json();
    
    // If the API call is successful, the city is valid
    return response.ok && data.cod === 200;
  } catch (error) {
    // Handle errors, e.g., network issues, API errors
    console.error('Error validating city:', error);
    return false;
  }
};
export default validateCity;
