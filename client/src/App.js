import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

function App() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatboxRef = useRef(null);

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        setLoading(true);

        const response = await axios.post('/chat', { message: userInput });
        const botMessage = response.data.message;
        const imageUrl = response.data.imageUrl;

        if (imageUrl) {
            setMessages([...messages, { role: 'user', content: userInput }, { role: 'bot', content: `<img src="${imageUrl}" alt="Generated Image" />` }]);
        } else {
            setMessages([...messages, { role: 'user', content: userInput }, { role: 'bot', content: botMessage }]);
        }

        setLoading(false);
        setUserInput('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    const handleChange = (event) => {
        setUserInput(event.target.value);
    };

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages, loading]);

    return (
        <div className="container d-flex flex-column justify-content-between vh-100 bg-light">
            <header className="text-center py-3 bg-success text-white">
                <h1>Chat with GPT-4</h1>
            </header>
            <div className="chatbox border rounded p-3 mb-3 flex-grow-1 overflow-auto" ref={chatboxRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`alert ${msg.role === 'user' ? 'alert-success' : 'alert-secondary'}`}>
                        <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong>
                        {msg.role === 'bot' && msg.content.includes('<img') ? (
                            <span dangerouslySetInnerHTML={{ __html: msg.content }}></span>
                        ) : (
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        )}
                        {msg.role === 'bot' && msg.tokens && <small>(Tokens: {msg.tokens})</small>}
                            </div>
                            ))}
                        {loading && <div className="text-center"><div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></div></div>}
                    </div>
                    <div className="input-group mb-3">
                    <textarea
                    value={userInput}
                 onChange={handleChange}
                 onKeyPress={handleKeyPress}
                 className="form-control form-control-lg"
                 placeholder='Type a message... (for images use the keyword "generate image")'
                 rows="3"
                 disabled={loading}
            />
            <button onClick={sendMessage} className="btn btn-success btn-lg" disabled={loading}>
                <FaPaperPlane />
            </button>
        </div>
</div>
);
}

export default App;
