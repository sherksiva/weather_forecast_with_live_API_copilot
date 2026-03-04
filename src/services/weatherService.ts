import axios from 'axios';
import type { CurrentWeather, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.warn(
    'Weather API key is not configured. Please set VITE_WEATHER_API_KEY in your .env file'
  );
}

const weatherAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric', // Use Celsius
  },
});

export const weatherService = {
  /**
   * Get current weather by city name
   */
  getCurrentWeatherByCity: async (cityName: string): Promise<CurrentWeather> => {
    const response = await weatherAPI.get<CurrentWeather>('/weather', {
      params: { q: cityName },
    });
    return response.data;
  },

  /**
   * Get current weather by coordinates
   */
  getCurrentWeatherByCoords: async (
    lat: number,
    lon: number
  ): Promise<CurrentWeather> => {
    const response = await weatherAPI.get<CurrentWeather>('/weather', {
      params: { lat, lon },
    });
    return response.data;
  },

  /**
   * Get 5-day forecast by city name
   */
  getForecastByCity: async (cityName: string): Promise<ForecastData> => {
    const response = await weatherAPI.get<ForecastData>('/forecast', {
      params: { q: cityName },
    });
    return response.data;
  },

  /**
   * Get 5-day forecast by coordinates
   */
  getForecastByCoords: async (
    lat: number,
    lon: number
  ): Promise<ForecastData> => {
    const response = await weatherAPI.get<ForecastData>('/forecast', {
      params: { lat, lon },
    });
    return response.data;
  },

  /**
   * Get geolocation
   */
  getGeolocation: async (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation not supported'));
      }
    });
  },
};

export default weatherService;
