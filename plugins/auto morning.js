import { setInterval } from 'timers';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const id = '919062628928@s.whatsapp.net'; // the WhatsApp ID

  // Function to send the message
  const sendMorningMessage = async () => {
    try {
      const sentMsg = await conn.sendMessage(id, { text: 'Good Morning 🌄' });
      console.log('Morning message sent:', sentMsg);
    } catch (error) {
      console.error('Failed to send morning message:', error);
    }
  };

  // Function to check the current time and send the message if it's 8:00 AM
  const checkTimeAndSendMessage = async () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 8 && minutes === 0) {
      await sendMorningMessage();
    }
  };

  // Set an interval to check the time every minute
  setInterval(checkTimeAndSendMessage, 60 * 1000); // 60 * 1000 ms = 1 minute

  // Inform that the scheduling is active
  m.reply('Auto morning message scheduling is active. The message will be sent daily at 8:00 AM.');
};

handler.help = ['alive'];
handler.tags = ['main'];
handler.command = /^(nargisa)$/i;

export default handler;
