# 🌦️ Weather Forecasting Copilot

A beautiful, modern React-based weather forecasting application with real-time data, smooth animations, and an intuitive user interface.

## ✨ Features

- **Real-time Weather Data**: Fetch current weather information using OpenWeatherMap API
- **5-Day Forecast**: View detailed 5-day weather predictions
- **Beautiful Animations**: Smooth transitions and animations powered by Framer Motion
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Geolocation Support**: Allow users to fetch weather for their current location
- **Detailed Weather Info**: View comprehensive weather details including:
  - Temperature (current, feels like, min, max)
  - Humidity and pressure
  - Wind speed and direction
  - Visibility
  - Cloud coverage
  - Sunrise and sunset times

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **OpenWeatherMap API** - Weather data provider

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd weather_forcasting_copilot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your OpenWeatherMap API key to `.env.local`:
```
VITE_WEATHER_API_KEY=your_api_key_here
```

Get your free API key at [openweathermap.org/api](https://openweathermap.org/api)

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized build will be created in the `dist/` directory.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CurrentWeatherCard.tsx      # Main weather display
│   ├── ForecastComponent.tsx        # 5-day forecast
│   ├── WeatherDetails.tsx           # Detailed weather info
│   └── SearchComponent.tsx          # Location search
├── services/           # API services
│   └── weatherService.ts           # OpenWeatherMap API calls
├── types/             # TypeScript types
│   └── weather.ts                 # Weather data interfaces
├── App.tsx            # Main application component
├── App.css            # Global styles
├── index.css          # Tailwind imports
└── main.tsx           # Entry point
```

## 🎨 Customization

### Modifying Colors and Animations

Edit `tailwind.config.js` to customize:
- Color schemes
- Custom animations
- Responsive breakpoints

### Adding New Features

#### Add a new component:
```bash
touch src/components/YourComponent.tsx
```

#### Use the weather service:
```typescript
import weatherService from '../services/weatherService';

// Fetch current weather
const data = await weatherService.getCurrentWeatherByCity('London');

// Fetch forecast
const forecast = await weatherService.getForecastByCity('London');
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Documentation

### Current Weather
- **Endpoint**: `/weather`
- **Parameters**: `q` (city name) or `lat`, `lon`
- **Returns**: Current weather data with temperature, humidity, wind speed, etc.

### 5-Day Forecast
- **Endpoint**: `/forecast`
- **Parameters**: `q` (city name) or `lat`, `lon`
- **Returns**: Weather forecast for every 3 hours for 5 days

## 🎯 Features Roadmap

- [ ] Historical weather data
- [ ] Weather alerts and warnings
- [ ] Multiple language support
- [ ] Dark/Light theme toggle
- [ ] Save favorite locations
- [ ] Air quality index
- [ ] UV index
- [ ] Weather charts and graphs
- [ ] Export weather data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://react.dev/) for the framework

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by your AI Assistant
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
