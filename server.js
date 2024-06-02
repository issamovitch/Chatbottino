const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    const message = req.body.message;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const botMessage = response.data.choices[0].message.content;
        if (botMessage.toLowerCase().includes("generate image")) {
            const imagePrompt = botMessage.replace('generate image', '').trim();
            const imageResponse = await axios.post('https://api.openai.com/v1/images/generations', {
                prompt: imagePrompt,
                n: 1,
                size: '1024x1024'
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            const imageUrl = imageResponse.data.data[0].url;
            res.json({ message: botMessage, imageUrl });
        } else {
            res.json({ message: botMessage });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
