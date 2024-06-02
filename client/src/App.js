import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [tokenCount, setTokenCount] = useState(0);

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        const response = await axios.post('/chat', { message: userInput });
        const botMessage = response.data.choices[0].message;
        const tokensUsed = response.data.usage.total_tokens;

        setMessages([...messages, { role: 'user', content: userInput }, { role: 'bot', content: botMessage.content, tokens: tokensUsed }]);
        setTokenCount(tokensUsed);
        setUserInput('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <h1>Chat with GPT-4</h1>
            <div id="chatbox">
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.role === 'user' ? 'You' : 'Bot'}</strong>
                        {msg.role === 'bot' && <small>({msg.tokens})</small>}
                            <strong> :</strong>
                        {msg.content}
                            </p>))}
                    </div>
                    <input
                    type="text"
                    value={userInput}
                 onChange={(e) => setUserInput(e.target.value)}
                 onKeyPress={handleKeyPress}
                 placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;

