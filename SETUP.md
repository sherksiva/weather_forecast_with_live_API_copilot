# Weather Forecasting Copilot - Setup Instructions

## 🔑 Getting Your OpenWeatherMap API Key

### Step 1: Create an Account
1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key
1. Log in to your OpenWeatherMap account
2. Go to "My API keys" section (usually in your profile settings)
3. Copy your default API key or generate a new one

### Step 3: Configure the Application
1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace `your_api_key_here` with your actual API key:
   ```
   VITE_WEATHER_API_KEY=abc123def456...
   ```

### Step 4: Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## ⚠️ Important Notes

- **Free Tier**: OpenWeatherMap offers a free tier with 1,000 API calls per day
- **Keep your API key private**: Never commit your `.env.local` file to version control
- **Rate Limiting**: The free tier has rate limits. If you exceed them, you'll get errors

## 🛠️ Troubleshooting

### "API key is not configured" Warning
- Make sure you've created `.env.local` and added your API key
- Restart the development server after adding the API key

### "Failed to fetch weather data"
- Check that your API key is correct and active
- Verify you have internet connection
- Check if you've exceeded the free tier rate limit

### "Failed to fetch location"
- Browser location access may need permission
- Check your browser settings for location access
- Make sure you're accessing the app via HTTPS in production

---

For more help, visit https://openweathermap.org/faq
