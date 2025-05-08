const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// OpenAI initialisieren mit sicherem Key über Umgebungsvariable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    res.json(chatCompletion);
  } catch (error) {
    console.error('Fehler bei OpenAI:', error.message);
    res.status(500).send('Fehler beim Verarbeiten der Anfrage');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy läuft auf Port', process.env.PORT || 3000);
});
