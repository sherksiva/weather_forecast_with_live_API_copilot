# Weather Forecasting Copilot - Architecture Guide

## 📐 Project Architecture

This document provides an in-depth overview of the application structure, components, and how to extend it.

## 🏗️ Directory Structure

```
weather_forcasting_copilot/
├── public/                      # Static assets
├── src/
│   ├── components/             # Reusable React components
│   │   ├── CurrentWeatherCard.tsx      # Main weather display card with animations
│   │   ├── ForecastComponent.tsx       # 5-day forecast display
│   │   ├── WeatherDetails.tsx          # Detailed weather information cards
│   │   └── SearchComponent.tsx         # City search and geolocation button
│   │
│   ├── services/               # API and business logic
│   │   └── weatherService.ts          # OpenWeatherMap API integration
│   │
│   ├── types/                  # TypeScript type definitions
│   │   └── weather.ts                 # Weather data interfaces
│   │
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Global application styles
│   ├── index.css               # Tailwind CSS imports and base styles
│   └── main.tsx                # Application entry point
│
├── tailwind.config.js          # Tailwind CSS configuration with custom animations
├── postcss.config.js           # PostCSS configuration
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript configuration
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── .env.example                # Environment variables template
├── README.md                   # Project documentation
├── SETUP.md                    # Setup and configuration guide
└── ARCHITECTURE.md             # This file
```

## 🧩 Component Overview

### 1. **SearchComponent** (`src/components/SearchComponent.tsx`)
**Purpose**: Provides user input for searching cities and geolocation functionality.

**Props**:
- `onSearch: (city: string) => void` - Callback when user searches for a city
- `isLoading: boolean` - Loading state indicator
- `onUseLocation: () => void` - Callback for geolocation button

**Features**:
- Text input for city search
- Find current location button
- Loading spinner animations
- Responsive design

**Dependencies**:
- Framer Motion for animations

### 2. **CurrentWeatherCard** (`src/components/CurrentWeatherCard.tsx`)
**Purpose**: Displays the current weather information with beautiful animations.

**Props**:
- `weather: CurrentWeather` - Current weather data
- `isLoading: boolean` - Loading state

**Features**:
- Dynamic background gradient based on weather condition
- Animated temperature display
- Weather emoji animation
- Mini cards for min/max/humidity
- Smooth transitions and loading states
- Glassmorphism design

**Dynamic Styling**:
- Clear → Blue gradient
- Clouds → Gray gradient
- Rain → Indigo/Purple gradient
- Thunderstorm → Dark purple gradient
- Snow → Light blue gradient

**Animations**:
- Weather emoji float animation
- Temperature scale-in animation
- Background element rotation
- Card slide-in animation

### 3. **WeatherDetails** (`src/components/WeatherDetails.tsx`)
**Purpose**: Displays detailed weather information in a grid layout.

**Props**:
- `weather: CurrentWeather` - Current weather data

**Information Displayed**:
- Wind Speed and Direction
- Humidity Percentage
- Atmospheric Pressure
- Visibility Distance
- Cloud Coverage
- Sunrise Time
- Sunset Time
- Geographic Coordinates

**Features**:
- 4-column responsive grid (1 on mobile, 2 on tablet, 4 on desktop)
- 3D hover effects
- Animated icons bounce effect
- Gradient backgrounds with transparency

### 4. **ForecastComponent** (`src/components/ForecastComponent.tsx`)
**Purpose**: Displays 5-day weather forecast.

**Props**:
- `forecast: ForecastData` - 5-day forecast data

**Features**:
- Daily forecast cards with weather summaries
- Temperature range (min/max)
- Weather emoji
- Hover scale effect
- Staggered animation on load
- Shows one card per day

**Data Processing**:
- Groups 3-hour forecast data by day
- Calculates temperature ranges
- Extracts primary weather condition

## 🔌 Services

### **weatherService** (`src/services/weatherService.ts`)
**Purpose**: Handles all weather API communications.

**Methods**:

#### `getCurrentWeatherByCity(cityName: string): Promise<CurrentWeather>`
Fetches current weather for a specified city.

**Example**:
```typescript
const weather = await weatherService.getCurrentWeatherByCity('London');
console.log(weather.main.temp); // Temperature in Celsius
```

#### `getCurrentWeatherByCoords(lat: number, lon: number): Promise<CurrentWeather>`
Fetches current weather for specified coordinates.

#### `getForecastByCity(cityName: string): Promise<ForecastData>`
Fetches 5-day forecast for a city.

#### `getForecastByCoords(lat: number, lon: number): Promise<ForecastData>`
Fetches 5-day forecast for coordinates.

#### `getGeolocation(): Promise<{ lat: number; lon: number }>`
Gets user's browser geolocation using the Geolocation API.

**Configuration**:
- Uses metric units (Celsius)
- Includes temperature feel-like values
- 4+ decimal precision for coordinates

## 📊 Type Definitions

### **weather.ts** Type Hierarchy

```typescript
CurrentWeather
├── coord: Coords
├── weather: WeatherCondition[]
├── main: WeatherMain
├── wind: Wind
├── clouds: Clouds
├── sys: Sys
└── [other properties]

ForecastData
├── list: ForecastItem[]
└── city: CityInfo

ForecastItem
├── dt: number (Unix timestamp)
├── main: WeatherMain
├── weather: WeatherCondition[]
└── [other properties]
```

## 🎨 Styling & Animation System

### Tailwind CSS Configuration
**Custom Extensions** (in `tailwind.config.js`):
- Custom color palette with dark shades
- Animation keyframes:
  - `float`: Vertical movement animation
  - `pulse-slow`: Opacity pulsing
  - `bounce-slow`: Slow bounce effect
  - `rotate-slow`: Continuous rotation

### Framer Motion Animations
- **Container variants**: Staggered animations for multiple children
- **Item variants**: Individual element animations
- **Hover effects**: Scale and interaction states
- **Entry animations**: Initial page load transitions

### Design System
- **Color Scheme**: Dark theme with blue/purple accents
- **Spacing**: Tailwind default scale
- **Typography**: System fonts with -webkit-font-smoothing
- **Borders**: Subtle gradients with transparency
- **Shadows**: Large shadows for depth

## 🔄 Data Flow

```
User Input (Search/Location)
    ↓
SearchComponent
    ↓
App.tsx (State Management)
    ↓
weatherService (API Call)
    ↓
OpenWeatherMap API
    ↓
Response Data
    ↓
App State Update
    ↓
Component Re-renders
    ↓
CurrentWeatherCard + WeatherDetails + ForecastComponent
```

## 📱 Responsive Design Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

**Component Adjustments**:
- `WeatherDetails`: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- `SearchComponent`: Full-width input (mobile) → Side-by-side buttons (desktop)
- `CurrentWeatherCard`: Adjusted padding and font sizes

## 🔐 Environment Variables

Required variable in `.env.local`:
```
VITE_WEATHER_API_KEY=your_api_key_here
```

**Note**: Environment variables are accessible in Vite via `import.meta.env`

## 🚀 Adding New Features

### Adding a New Component

1. Create file: `src/components/MyComponent.tsx`
2. Define interfaces/types
3. Import required dependencies
4. Implement with Framer Motion and Tailwind
5. Export component
6. Import and use in `App.tsx` or other components

**Example**:
```typescript
import { motion } from 'framer-motion';

interface MyComponentProps {
  data: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6"
    >
      {data}
    </motion.div>
  );
};
```

### Adding API Endpoints

1. Open `src/services/weatherService.ts`
2. Add new method
3. Use error handling
4. Return typed response

```typescript
export const newFeature = async (param: string): Promise<ResponseType> => {
  const response = await weatherAPI.get<ResponseType>('/endpoint', {
    params: { param },
  });
  return response.data;
};
```

### Adding New Animations

1. Edit `tailwind.config.js`
2. Add keyframes and animations
3. Apply classes to elements:
   ```jsx
   <div className="animate-your-animation">
   ```

## 🐛 Common Issues & Solutions

### API Key Not Working
- Verify key is correctly set in `.env.local`
- Check OpenWeatherMap account is active
- Restart dev server after changing `.env.local`

### Animations Not Smooth
- Check browser performance
- Ensure GPU acceleration is enabled
- Reduce animation duration for low-end devices

### Type Errors
- Run `npm run lint` to check TypeScript
- Ensure all imports use `type` keyword for types
- Check that all types are properly exported from `types/weather.ts`

## 📚 Development Workflow

1. **Development**: `npm run dev`
2. **Building**: `npm run build`
3. **Preview Build**: `npm run preview`
4. **Linting**: `npm run lint`

## 🔗 External Resources

- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [React Documentation](https://react.dev)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)

## 🎯 Performance Optimization Tips

1. **Lazy Load Components**: Use React.lazy() for code splitting
2. **Memoize Components**: Use React.memo() for expensive renders
3. **Optimize Animations**: Reduce animation count on mobile
4. **Cache API Responses**: Implement response caching
5. **Image Optimization**: If using weather icons

---

For questions or suggestions, please open an issue or contact the development team.
