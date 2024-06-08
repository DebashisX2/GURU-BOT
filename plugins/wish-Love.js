let handler = async (m, { conn }) => {
   let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    // Audio file URL
    let av = `./Assets/mp3/ILoveYou.mp3`;

    // React with a random emoji
    m.react(pickRandom(['💘', '💝', '❤️‍🩹', '💓', '❤️‍🔥', '❣️', '💕', '💞', '💗', '💖', '💙', '😘', '🥰', '😍']));

    // List of love messages in Bengali
    const loveMessages = [
        `প্রিয় ${taguser}, তোমার সাথে কাটানো প্রতিটি মুহূর্ত আমার জন্য বিশেষ। তোমার হাসি, তোমার কথা, সবকিছুই আমাকে মুগ্ধ করে। আমি তোমার পাশে থাকতে চাই, তোমার সুখ-দুঃখের সাথী হতে চাই। তুমি কি আমার প্রেমের প্রস্তাবে সাড়া দেবে? জীবনটা তোমার সাথে কাটাতে চাই।`,
        `প্রিয় ${taguser}, তোমার জন্য আমার মনে এক অন্যরকম অনুভূতি জাগে। তোমার হাসি, তোমার চোখ, সবকিছুই আমাকে আকর্ষণ করে। আমি তোমার পাশে থেকে তোমাকে ভালবাসতে চাই, তোমার সুখ-দুঃখের সাথী হতে চাই। তুমি কি আমাকে তোমার জীবনের অংশ হতে দেবে? চিরকাল তোমার পাশে থাকতে চাই।`,
        `প্রিয় ${taguser}, তোমার সাথে কাটানো প্রতিটি মুহূর্ত আমার হৃদয়কে পূর্ণ করে। তোমার হাসি, তোমার কথা, সবকিছুই আমাকে আনন্দে ভরিয়ে তোলে। আমি তোমার পাশে থাকতে চাই, তোমার সুখ-দুঃখের সাথী হতে চাই। তুমি কি আমার প্রেমের প্রস্তাবে সাড়া দেবে? জীবনটা তোমার সাথে কাটাতে চাই।`,
        `প্রিয় ${taguser}, তোমার চোখের মায়া আমাকে মুগ্ধ করে। তোমার সাথে কাটানো প্রতিটি মুহূর্তই আমার জীবনের অন্যতম শ্রেষ্ঠ সময়। আমি তোমার পাশে থাকতে চাই, তোমার সুখ-দুঃখের সাথী হতে চাই। তুমি কি আমার প্রেমের প্রস্তাবে সাড়া দেবে? আমাদের জীবনটা একসাথে কাটাতে চাই।`,
        `প্রিয় ${taguser}, তোমার চোখের দিকে তাকালেই মনটা ভরে যায়। তোমার সাথে কাটানো প্রতিটি মুহূর্তই আমার জীবনের অন্যতম শ্রেষ্ঠ সময়। আমি তোমার পাশে থাকতে চাই, তোমার সুখ-দুঃখের সাথী হতে চাই। তুমি কি আমার প্রেমের প্রস্তাবে সাড়া দেবে? আমাদের জীবনটা একসাথে কাটাতে চাই।`,
        `প্রিয় ${taguser}, তোমার জন্য আমার মনে এক অন্যরকম অনুভূতি জাগে। তোমার হাসি, তোমার চোখ, সবকিছুই আমাকে আকর্ষণ করে। আমি তোমার পাশে থেকে তোমাকে ভালবাসতে চাই, তোমার সুখ-দুঃখের সাথী হতে চাই। তুমি কি আমাকে তোমার জীবনের অংশ হতে দেবে? চিরকাল তোমার পাশে থাকতে চাই।`,
        `প্রিয় ${taguser}, তোমার সাথে কথা বললেই মনটা আনন্দে ভরে যায়। তোমার হাসি, তোমার চোখের মায়া, সবকিছুই আমাকে মুগ্ধ করে। তোমার পাশে থাকার ইচ্ছাটা অনেক দিন ধরে মনে পুষে রেখেছি। তুমি কি আমার জীবনের সঙ্গী হতে চাও? আমাদের জীবনের প্রতিটি মুহূর্ত একসাথে কাটাতে চাই। ভালোবাসি তোমায়।`
    ];

    // Send a random love message
    m.reply(pickRandom(loveMessages));

    // Send the audio file
    await conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
};

// Custom prefix and command to trigger the handler
handler.customPrefix = /^(love|love you|ভালোবাসি)$/i;
handler.command = new RegExp;

export default handler;

// Function to pick a random item from a list
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}
