require("dotenv").config()
const Groq = require('groq-sdk');

const groq = new Groq({apiKey:process.env.SECRETKEY});
async function Gemma_model(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": "Be My legal advisor and answer this as per indian law "+prompt,
      }
    ],
    "model": "gemma-7b-it",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });
let response =''
  for await (const chunk of chatCompletion) {
    response+=chunk.choices[0]?.delta?.content || '';
  }
  return response;
}

module.exports=Gemma_model;