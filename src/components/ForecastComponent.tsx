import { motion } from 'framer-motion';
import type { ForecastData, ForecastItem } from '../types/weather';

interface ForecastComponentProps {
  forecast: ForecastData;
}

interface DayForecast {
  date: string;
  day: string;
  temps: number[];
  description: string;
  icon: string;
}

const getWeatherIcon = (description: string): string => {
  const desc = description.toLowerCase();
  if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('thunderstorm')) return '⛈️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
  return '🌤️';
};

const groupForecastByDay = (items: ForecastItem[]): DayForecast[] => {
  const grouped: { [key: string]: typeof items } = {};

  items.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return Object.entries(grouped).slice(0, 5).map(([date, dayItems]) => {
    const temps = dayItems.map((item) => item.main.temp);
    const description = dayItems[0].weather[0].description;
    const dateObj = new Date(date);
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    return {
      date,
      day,
      temps,
      description,
      icon: getWeatherIcon(description),
    };
  });
};

export const ForecastComponent: React.FC<ForecastComponentProps> = ({ forecast }) => {
  const dailyForecasts = groupForecastByDay(forecast.list);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-white shadow-2xl"
    >
      <h3 className="text-2xl font-bold mb-6">5-Day Forecast</h3>

      <div className="space-y-3">
        {dailyForecasts.map((dayForecast, index) => (
          <motion.div
            key={dayForecast.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, x: 10 }}
            className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-blue-700/50 hover:to-blue-600/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20">
                <p className="font-semibold text-lg">{dayForecast.day}</p>
                <p className="text-sm text-gray-300">{dayForecast.date}</p>
              </div>
              <motion.div className="text-4xl">{dayForecast.icon}</motion.div>
              <div className="flex-1">
                <p className="capitalize text-sm text-gray-300">{dayForecast.description}</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="text-right">
                <p className="text-sm text-gray-400">Temp Range</p>
                <p className="font-semibold">
                  {Math.round(Math.max(...dayForecast.temps))}°C /{' '}
                  <span className="text-blue-300">
                    {Math.round(Math.min(...dayForecast.temps))}°C
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastComponent;
