const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WordNet = require('wordnet');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/rewrite', (req, res) => {
  const { article } = req.body;

  if (!article || article.trim() === '') {
    return res.status(400).json({ message: 'Article content is required.' });
  }

  // Simple word replacement logic
  const words = article.split(' ');
  const rewrittenWords = words.map((word) => {
    const synonyms = WordNet.lookup(word.toLowerCase()); // Lookup synonyms
    if (synonyms.length > 0) {
      return synonyms[0]; // Replace with the first synonym
    }
    return word; // Keep the original word if no synonym found
  });

  const rewritten = rewrittenWords.join(' ');
  res.json({ rewritten });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
