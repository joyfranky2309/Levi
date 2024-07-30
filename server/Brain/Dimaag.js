require("dotenv").config();
const Groq = require('groq-sdk');

console.log(process.env.SECRETKEY);
const groq = new Groq({ apiKey: process.env.SECRETKEY });

async function Gemma_model(prompt) {
 try {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": "Be My legal advisor,your name is Levi Ackerman(Address the name properly if there is a question about it) and answer this as per Indian law {" + prompt+"} If this prompt is irrelevant then simply admit that you cannot do it As you are legal advisor",
      }
    ],
    "model": "gemma-7b-it",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  let response = '';
  for await (const chunk of chatCompletion) {
    response += chunk.choices[0]?.delta?.content || '';
  }
  const checkres=await correction(prompt,response)
  return checkres;
 } catch (error) {
  console.log(error)
 }
}
async function correction(prompt,response){
  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": "your name is Levi Ackerman and you are a legal assistant enhance the given response: "+ response+" appropriately based on the given question: "+prompt+" based on indian law And you don't have to specify your name unless the question is about your name ",
        }
      ],
      "model": "llama3-70b-8192",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": true,
      "stop": null
    });
  
    let res = '';
    for await (const chunk of chatCompletion) {
      res += chunk.choices[0]?.delta?.content || '';
    }
    return res;
   } catch (error) {
    console.log(error)
   }
}
module.exports = Gemma_model;
