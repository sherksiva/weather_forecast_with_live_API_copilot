import { motion } from 'framer-motion';
import type { CurrentWeather } from '../types/weather';

interface WeatherDetailsProps {
  weather: CurrentWeather;
}

const formatTime = (timestamp: number, timezone: number): string => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  const details = [
    {
      icon: '💨',
      label: 'Wind Speed',
      value: `${Math.round(weather.wind.speed)} m/s`,
      subtext: `Direction: ${weather.wind.deg}°`,
    },
    {
      icon: '💧',
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
      subtext: 'Moisture in air',
    },
    {
      icon: '🌡️',
      label: 'Pressure',
      value: `${weather.main.pressure} mb`,
      subtext: 'Atmospheric pressure',
    },
    {
      icon: '👁️',
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      subtext: 'Clear sight distance',
    },
    {
      icon: '☁️',
      label: 'Cloudiness',
      value: `${weather.clouds.all}%`,
      subtext: 'Cloud coverage',
    },
    {
      icon: '🌅',
      label: 'Sunrise',
      value: formatTime(weather.sys.sunrise, weather.timezone),
      subtext: 'Start of day',
    },
    {
      icon: '🌇',
      label: 'Sunset',
      value: formatTime(weather.sys.sunset, weather.timezone),
      subtext: 'End of day',
    },
    {
      icon: '📍',
      label: 'Coordinates',
      value: `${weather.coord.lat.toFixed(2)}°, ${weather.coord.lon.toFixed(2)}°`,
      subtext: `${weather.sys.country}`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {details.map((detail) => (
        <motion.div
          key={detail.label}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
          }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-md border border-blue-500/20 hover:border-blue-500/50 rounded-2xl p-4 text-white"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl mb-3"
          >
            {detail.icon}
          </motion.div>
          <p className="text-gray-300 text-xs font-semibold uppercase tracking-wide mb-1">
            {detail.label}
          </p>
          <p className="text-2xl font-bold mb-1">{detail.value}</p>
          <p className="text-gray-400 text-xs">{detail.subtext}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WeatherDetails;
