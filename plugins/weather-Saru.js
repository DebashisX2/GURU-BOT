import fetch from 'node-fetch';
import cron from 'node-cron';

const weatherApiKey = '060a6bcfa19809c2cd4d97a212b19273'; // replace with your weather API key
const city = 'Kolkata';
const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
const crushWhatsAppId = '919062628928@s.whatsapp.net'; // replace with the WhatsApp ID of your crush

let previousWeather = '';

const weatherNotifications = {
  rain: {
    message: 'It\'s raining in Kolkata! ☔',
    audio: './Media/rain.mp3',
  },
  clear: {
    message: 'It\'s clear and sunny in Kolkata! ☀️',
    audio: './Media/sunny.mp3',
  },
  clouds: {
    message: 'It\'s cloudy in Kolkata! ☁️',
    audio: './Media/cloudy.mp3',
  },
  // Add more weather conditions as needed
};

let checkWeatherAndNotify = async (conn) => {
  try {
    // Fetch weather data
    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    // Get current weather condition
    const currentWeather = data.weather[0].main.toLowerCase();

    // Check if the weather has changed
    if (currentWeather !== previousWeather) {
      previousWeather = currentWeather;

      // Check if we have a notification for the current weather condition
      if (weatherNotifications[currentWeather]) {
        const { message, audio } = weatherNotifications[currentWeather];

        // Send a message notifying the change in weather
        await conn.sendMessage(crushWhatsAppId, { text: message });
        
        // Send an audio message
        await conn.sendMessage(crushWhatsAppId, { audio: { url: audio }, mimetype: 'audio/mp4' });
      } else {
        // Default message for unhandled weather conditions
        await conn.sendMessage(crushWhatsAppId, { text: `Weather update: It's now ${currentWeather} in Kolkata!` });
      }
    }
  } catch (error) {
    console.error('Error checking weather or sending message:', error);
  }
}

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  // Initial activation message
  await conn.sendMessage(m.chat, { text: 'Weather notification activated! Checking every 2 hours.' });

  // Schedule the weather check every 2 hours
  cron.schedule('0 */2 * * *', () => {
    checkWeatherAndNotify(conn);
  });
}

handler.help = ['weather'];
handler.tags = ['tools'];
handler.command = ['SaruWeather'];
handler.group = false;

export default handler;
