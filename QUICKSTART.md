# ⚡ Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Get Your API Key (2 minutes)
```
1. Visit: https://openweathermap.org/api
2. Sign up for a free account
3. Go to "My API keys" and copy your key
```

### 2. Configure the App (1 minute)
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add your API key:
# VITE_WEATHER_API_KEY=your_key_here
```

### 3. Start the App (1 minute)
```bash
npm run dev
```

Open your browser to: **http://localhost:5173**

### 4. Explore Features (1 minute)
- 🔍 Search for any city
- 📍 Use "Location" button for your current weather
- 🌤️ View 5-day forecast
- ℹ️ Check detailed weather metrics

---

## 📦 What's Included

| Feature | Status |
|---------|--------|
| Real-time weather data | ✅ |
| 5-day forecast | ✅ |
| Smooth animations | ✅ |
| Beautiful UI | ✅ |
| Geolocation support | ✅ |
| Responsive design | ✅ |
| TypeScript support | ✅ |
| Dark theme | ✅ |

---

## 📂 Key Files

```
src/
├── App.tsx                          # Main app with state management
├── components/
│   ├── SearchComponent.tsx          # Search & location
│   ├── CurrentWeatherCard.tsx       # Main weather display
│   ├── WeatherDetails.tsx           # Weather metrics
│   └── ForecastComponent.tsx        # 5-day forecast
├── services/
│   └── weatherService.ts            # API calls
└── types/
    └── weather.ts                   # TypeScript types
```

---

## 🎮 Commands

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Check code quality
```

---

## 🌈 Customization Tips

### Change Colors
Edit `tailwind.config.js` - colors section

### Add Animations
Edit `tailwind.config.js` - keyframes section

### Modify Layout
Edit components in `src/components/`

### Add Features
Follow the pattern in [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 📖 Documentation

- **README.md** - Full project documentation
- **SETUP.md** - Detailed setup instructions
- **ARCHITECTURE.md** - Component and architecture guide

---

## ⚠️ Important Notes

- ✅ Keep your API key in `.env.local` (never commit to git)
- ✅ Free tier includes 1,000 calls/day
- ✅ You need an active internet connection
- ✅ Some features require browser permissions (location)

---

## 🆘 Troubleshooting

**App shows "API key is not configured"**
→ Make sure `.env.local` exists with your API key

**"Failed to fetch weather data"**
→ Check internet connection and API key validity

**Port 5173 already in use**
→ Run: `npm run dev -- --port 3000`

**TypeScript errors**
→ Run: `npm run lint` to see detailed errors

---

## 🎯 Next Steps

1. Get your free API key at [openweathermap.org](https://openweathermap.org/api)
2. Configure `.env.local` with your API key
3. Run `npm run dev`
4. Open http://localhost:5173
5. Search for a city and explore!

---

## 📞 Need Help?

- Check [SETUP.md](./SETUP.md) for detailed setup
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for development guide
- Visit [OpenWeatherMap FAQ](https://openweathermap.org/faq)

---

**Happy forecasting! 🌦️**
