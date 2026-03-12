const express = require('express');
const admin = require('firebase-admin');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_KEY))
});
const db = admin.firestore();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

client.login(process.env.DISCORD_TOKEN);

app.get('/', (req, res) => res.send('Online'));

const PORT = process.env.PORT || 10000;
app.listen(PORT);

app.get('/', (req, res) => {
  res.send('ICG STAFF BOT běží!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server naslouchá na portu ${PORT}`);
});
