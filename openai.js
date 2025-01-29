import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  OpenAIApi  from 'openai';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Configure OpenAI
const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY || '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',
});

console.log("openai", openai);

// Function to interact with ChatGPT
async function askChatGPT(prompt) {
  console.log("prompt", prompt);
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Or "gpt-4" for the GPT-4 model
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error communicating with ChatGPT:", error);
        return "An error occurred while processing your request.";
    }
}

// API endpoint to interact with ChatGPT
app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const response = await askChatGPT(prompt);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: "Failed to process the request" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
