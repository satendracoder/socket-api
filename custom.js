const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/chat', (req, res) => {
    const { prompt } = req.body;

    // Simulate basic responses
    const responses = {
        "hello": "Hi there!",
        "how are you?": "I'm doing great, thanks for asking!",
        "bye": "Goodbye!",
    };

    const response = responses[prompt.toLowerCase()] || "I'm not sure how to respond to that.";
    res.json({ response });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
