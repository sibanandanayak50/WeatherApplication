import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

class WeatherService {
  static async get5DayForecast(cityName) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric', // For temperature in Celsius
        },
      });

      const data = response.data.list;
      // Filter the first forecast entry of each day
      const dailyForecasts = [];
      const datesTracked = new Set();

      for (const entry of data) {
        const date = entry.dt_txt.split(' ')[0];
        if (!datesTracked.has(date)) {
          dailyForecasts.push({
            date,
            temp: entry.main.temp,
            tempMax: entry.main.temp_max,
            tempMin: entry.main.temp_min,
            pressure: entry.main.pressure,
            humidity: entry.main.humidity,
          });
          datesTracked.add(date);
        }
      }

      return dailyForecasts.slice(0, 5); // Get the first 5 days
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}

export default WeatherService;
