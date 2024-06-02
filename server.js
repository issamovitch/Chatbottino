const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    const message = req.body.message;
    console.log('Received message:', message);
    console.log('Received message:', req.body);
    try {
        console.error(process.env.OPENAI_API_KEY)
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
            messages: [{ role: 'user', content: message }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('OpenAI response:', response.data);
        res.json({
            choices: response.data.choices,
            usage: response.data.usage
        });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: error });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
