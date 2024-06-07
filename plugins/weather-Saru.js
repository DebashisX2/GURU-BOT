import axios from 'axios';
import cron from 'node-cron';

const weatherApiKey = '060a6bcfa19809c2cd4d97a212b19273'; // replace with your weather API key

const locations = [
  {
    city: 'Kolkata',
    crushWhatsAppId: '919907106071@s.whatsapp.net', // replace with the WhatsApp ID of your crush for Kolkata
  },
  {
    city: 'Howrah',
    crushWhatsAppId: '919062628928@s.whatsapp.net', // replace with your WhatsApp ID for Howrah
  },
  {
    city: 'Medinipur',
    crushWhatsAppId: '919339523744@s.whatsapp.net', // replace with the WhatsApp ID of your 2nd crush for Madinipur
  }
];

const weatherNotifications = {
  rain: {
    message: (city) => `It's raining in ${city}! ☔`,
    audio: 'https://cdn36.savetube.me/media/hIfragStktw/ye-mausam-ki-barish-slow-reverb-song-barish-tanishk-bagchi-half-girlfriend-barish-aesthetic-status-128-ytshorts.savetube.me.mp3',
  },
  clear: {
    message: (city) => `It's clear and sunny in ${city}! ☀️`,
    audio: 'https://cdn34.savetube.me/media/zu6IJ19qW70/aaj-tu-hai-pani-pani-song-best-status-video-128-ytshorts.savetube.me.mp3',
  },
  clouds: {
    message: (city) => `It's cloudy in ${city}! ☁️`,
    audio: 'https://cdn38.savetube.me/media/VlVsBWnHDpE/aasma-me-jaise-badal-song-neha-kakkar-shorts-ytshorts-128-ytshorts.savetube.me.mp3',
  },
  // Add more weather conditions as needed
};

let previousWeather = {};

const checkWeatherAndNotify = async (conn, location) => {
  try {
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location.city}&appid=${weatherApiKey}&units=metric`;

    // Fetch weather data
    const response = await axios.get(weatherApiUrl);
    const data = response.data;

    // Get current weather condition
    const currentWeather = data.weather[0].main.toLowerCase();

    // Check if the weather has changed
    if (currentWeather !== previousWeather[location.city]) {
      previousWeather[location.city] = currentWeather;

      // Check if we have a notification for the current weather condition
      if (weatherNotifications[currentWeather]) {
        const { message, audio } = weatherNotifications[currentWeather];
        const notificationMessage = message(location.city);

        // Send a message notifying the change in weather
        await conn.sendMessage(location.crushWhatsAppId, { text: notificationMessage });
        
        // Send an audio message
        await conn.sendMessage(location.crushWhatsAppId, { audio: { url: audio }, mimetype: 'audio/mp4' });
      } else {
        // Default message for unhandled weather conditions
        await conn.sendMessage(location.crushWhatsAppId, { text: `Weather update: It's now ${currentWeather} in ${location.city}!` });
      }
    }
  } catch (error) {
    console.error(`Error checking weather or sending message for ${location.city}:`, error);
  }
};

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  // Initial activation message
  await conn.sendMessage(m.chat, { text: 'Weather notification activated! Checking every 2 hours.' });

  // Schedule the weather check every 2 hours
  cron.schedule('0 */2 * * *', () => {
    locations.forEach(location => checkWeatherAndNotify(conn, location));
  });
};

handler.help = ['weather'];
handler.tags = ['tools'];
handler.command = ['saruu'];
handler.group = false;

export default handler;
