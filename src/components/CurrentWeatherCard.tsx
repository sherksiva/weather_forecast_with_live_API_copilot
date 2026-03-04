import { motion } from 'framer-motion';
import type { CurrentWeather } from '../types/weather';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  isLoading: boolean;
}

const getWeatherEmoji = (description: string): string => {
  const desc = description.toLowerCase();
  if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('thunderstorm')) return '⛈️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
  return '🌤️';
};

const getBackgroundGradient = (weatherMain: string): string => {
  const main = weatherMain.toLowerCase();
  if (main === 'clear') return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
  if (main === 'clouds') return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600';
  if (main === 'rain') return 'bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700';
  if (main === 'thunderstorm') return 'bg-gradient-to-br from-indigo-700 via-purple-700 to-gray-800';
  if (main === 'snow') return 'bg-gradient-to-br from-blue-200 via-white to-blue-300';
  return 'bg-gradient-to-br from-blue-400 via-teal-500 to-green-600';
};

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl animate-pulse"
      />
    );
  }

  const weatherEmoji = getWeatherEmoji(weather.weather[0].description);
  const bgGradient = getBackgroundGradient(weather.weather[0].main);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${bgGradient} rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden`}
    >
      {/* Background animated elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-1">{weather.name}</h2>
            <p className="text-white/80 capitalize">{weather.weather[0].description}</p>
          </div>
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl"
          >
            {weatherEmoji}
          </motion.div>
        </div>

        <div className="flex items-baseline gap-2 mb-8">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl font-bold"
          >
            {Math.round(weather.main.temp)}°C
          </motion.span>
          <span className="text-white/70 text-lg">
            Feels like {Math.round(weather.main.feels_like)}°C
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Min', value: `${Math.round(weather.main.temp_min)}°C` },
            { label: 'Max', value: `${Math.round(weather.main.temp_max)}°C` },
            { label: 'Humidity', value: `${weather.main.humidity}%` },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center"
            >
              <p className="text-white/80 text-sm">{item.label}</p>
              <p className="text-white font-semibold">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeatherCard;
