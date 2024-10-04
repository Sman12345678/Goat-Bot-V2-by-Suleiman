const axios = require('axios');
const UPoLPrefix = [
  'kora',
  'ask',
  'sule',
  'bot',
  
]; 

  module.exports = {
  config: {
    name: 'ai',
    version: '1.2.1',
    role: 0,
    category: 'AI',
    author: 'Sman',
    shortDescription: 'Get response from kora',
    longDescription: '',
  },
  
  onStart: async function () {},
  onChat: async function ({ message, event, args, api, threadID, messageID }) {
      
      const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!ahprefix) {
        return; 
      } 
      
     const upol = event.body.substring(ahprefix.length).trim();
   if (!upol) {
        await message.reply('Hey buddy! How Can i help you Today 😎');
        return;
      }
      
      const apply = ['Hey! Kora is here to help', 'How can i help you today?', 'How can kora assist you today?', '👌'];
      
     const randomapply = apply[Math.floor(Math.random() * apply.length)];

     
      if (args[0] === 'hi') {
          message.reply(`${randomapply}`);
          return;
      }
      
    const encodedPrompt = encodeURIComponent(args.join(" "));

   await message.reply('Kora Thinking ⏳');
  
    const response = await axios.get(`https://kora-ai.onrender.com/koraai?query=${encodedPrompt}`);
 
     const UPoL = response.data.answer; 

      const upolres = `${UPoL}`;
      
        message.reply(upolres);
  }
};
