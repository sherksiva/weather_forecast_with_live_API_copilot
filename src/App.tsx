import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import SearchComponent from './components/SearchComponent';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import WeatherDetails from './components/WeatherDetails';
import ForecastComponent from './components/ForecastComponent';
import weatherService from './services/weatherService';
import type { CurrentWeather, ForecastData } from './types/weather';

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [currentData, forecastData] = await Promise.all([
        weatherService.getCurrentWeatherByCity(city),
        weatherService.getForecastByCity(city),
      ]);
      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const coords = await weatherService.getGeolocation();
      const [currentData, forecastData] = await Promise.all([
        weatherService.getCurrentWeatherByCoords(coords.lat, coords.lon),
        weatherService.getForecastByCoords(coords.lat, coords.lon),
      ]);
      setCurrentWeather(currentData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch location or weather data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch default city on mount
  useEffect(() => {
    fetchWeather('London');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent pointer-events-none"
      />

      {/* Main content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-8 px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
            Weather Forecast
          </h1>
          <p className="text-gray-300 text-lg">Real-time weather updates for any location</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 py-8"
        >
          <SearchComponent
            onSearch={fetchWeather}
            isLoading={isLoading}
            onUseLocation={fetchWeatherByCoords}
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200"
            >
              {error}
            </motion.div>
          )}

          {currentWeather && (
            <>
              <CurrentWeatherCard weather={currentWeather} isLoading={isLoading} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 mb-8"
              >
                <WeatherDetails weather={currentWeather} />
              </motion.div>
            </>
          )}

          {forecast && <ForecastComponent forecast={forecast} />}

          {!currentWeather && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-6 text-gray-400 text-sm mt-12 border-t border-gray-700/50"
        >
          <p>Powered by OpenWeatherMap API</p>
          <p className="mt-2 text-xs text-gray-500">
            Get your free API key at{' '}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              openweathermap.org
            </a>
          </p>
        </motion.footer>
      </div>
    </motion.div>
  );
}

export default App;
