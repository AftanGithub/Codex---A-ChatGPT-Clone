import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';

dotenv.config ();
// console.log (process.env.OPENAI_APIKEY);
const configuration = new Configuration ({
  apiKey: process.env.OPENAI_APIKEY,
});

const openai = new OpenAIApi (configuration);

const app = express ();
app.use (cors ());

app.use (express.json ());

app.get ('/', async (req, res) => {
  res.status (200).send ('hello from codex!');
});

app.post ('/', async (req, res) => {
  console.log (req.body);
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion ({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status (200).send ({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    console.log (err);
    res.status (400).send (err);
  }
});

app.listen (5000, () => {
  console.log ('SERVER is listening on port 5000');
});
