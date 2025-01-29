const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000; // You can change this to your desired port

// Configure CORS to allow requests from different origins
app.use(cors());

//body parser with JSON
app.use(express.json({limit: "80kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"));
app.use(cookieParser());

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI("AIzaSyAZJ10UhfMs9Ka-etLLOcs7efKqXASV8V0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define a route to handle AI prompts
app.post('/generate', async (req, res) => {
    console.log(req.body);
    
  const prompt = req.body.prompt;
   // console.log(prompt);
    
  try {
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});