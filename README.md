# GPT-4 Chatbot with Image Generation

This is a chatbot application that uses OpenAI's GPT-4 model to generate text responses and can also generate images based on the context of the user's prompt. The app leverages both GPT-4 for text processing and DALL-E for image generation.

## Features

- **Text Responses**: The chatbot responds to text queries using the GPT-4 model.
- **Image Generation**: The chatbot can generate images based on the context of the prompt using DALL-E.
- **Markdown Support**: The chatbot supports markdown formatting for responses.
- **Loading Indicator**: Shows a loading spinner while waiting for the bot's response.
- **Professional Design**: Uses Bootstrap for a professional and responsive design.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/gpt-4-chatbot.git
    cd gpt-4-chatbot
    ```

2. **Install Server Dependencies**:
    ```bash
    npm install
    ```

3. **Install Client Dependencies**:
    ```bash
    cd client
    npm install
    cd ..
    ```

4. **Set Up Environment Variables**:
    - Create a `.env` file in the root directory and add your OpenAI API key:
    ```plaintext
    OPENAI_API_KEY=your_openai_api_key
    ```

## Usage

1. **Run the Application**:
    ```bash
    npm start
    ```

2. **Access the Chatbot**:
    - Open your browser and go to `http://localhost:3000`.

## File Structure

- **server.js**: Handles the backend logic, including API requests to OpenAI.
- **client/**: Contains the React frontend code.
    - **src/App.js**: Main React component that renders the chat interface.
    - **src/App.css**: Custom CSS for styling the app.
    - **public/**: Public assets and HTML template.

## Development

### Backend

The backend is built with Express and handles the following:

- **/chat**: Endpoint for processing text queries and generating responses using GPT-4.
- **/generate-image**: Endpoint for generating images based on a text prompt using DALL-E.

### Frontend

The frontend is built with React and includes the following features:

- **Chat Interface**: A responsive chat interface built with Bootstrap.
- **Markdown Rendering**: Renders bot responses with markdown formatting.
- **Image Display**: Displays images generated by the bot within the chat interface.

## Customization

### Adding Keywords for Image Generation

To add more keywords for image generation, update the `imageKeywords` array in `server.js`:

```javascript
const imageKeywords = ['generate image'];
