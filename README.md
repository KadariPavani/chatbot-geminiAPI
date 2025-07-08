# 🤖 Gemini AI Chatbot

A sleek, modern web-based chatbot powered by Google's Gemini AI with full chat history management and responsive design.

![Chatbot Preview](https://img.shields.io/badge/Status-Ready%20to%20Use-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **🎯 AI-Powered Conversations** - Powered by Google Gemini 1.5 Flash
- **💬 Chat History Management** - Save, view, and manage all your conversations
- **🔄 Multiple Chat Sessions** - Switch between different conversations seamlessly
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **🎨 Modern UI** - Clean, gradient design with smooth animations
- **💾 Local Storage** - All chats saved locally in your browser
- **🗑️ Delete Options** - Remove individual chats or clear all history
- **⚡ Real-time Typing** - See when AI is thinking with animated indicators
- **📝 Message Formatting** - Support for bold, italic, code, and more

## 🚀 Quick Start

1. **Download** the `chatbot.html` file
2. **Open** it in any modern web browser
3. **Start chatting** immediately!

No installation, no setup, no dependencies required!

## 🛠️ Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls

### Installation
1. Save the provided HTML code as `chatbot.html`
2. Double-click the file to open in your browser
3. The chatbot is ready to use!

### API Key Configuration
The chatbot comes with a pre-configured API key, but for production use:
1. Get your own API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Replace the `apiKey` value in the JavaScript code
3. Save and reload the page

## 🎮 How to Use

### Basic Chat
- Type your message in the input field
- Press **Enter** or click the send button
- AI will respond in real-time

### History Management
- **📋 History**: View all previous conversations
- **➕ New Chat**: Start a fresh conversation
- **🗑️ Clear All**: Delete all chat history (with confirmation)

### Chat Navigation
- Click any chat in the sidebar to resume it
- Active chat is highlighted in the sidebar
- Each chat shows preview text and date

### Message Features
- **Multi-line messages**: Use Shift+Enter for new lines
- **Code formatting**: Use backticks for `code`
- **Bold text**: Use **double asterisks**
- **Italic text**: Use *single asterisks*

## 🔧 Customization

### Styling
- Colors: Modify the CSS gradient variables
- Fonts: Change the font-family in the CSS
- Layout: Adjust container max-width and padding

### API Settings
```javascript
generationConfig: {
    temperature: 0.7,     // Creativity level (0-1)
    topK: 40,            // Token selection diversity
    topP: 0.95,          // Nucleus sampling
    maxOutputTokens: 1024 // Response length limit
}
```

### Storage
- Uses localStorage for chat persistence
- Data stays on your device
- Clear browser data to reset everything

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly interface
- Optimized for small screens
- Sidebar adapts to mobile layout

## 🛡️ Security & Privacy

- **Local Storage**: All chats stored locally on your device
- **No Server**: No chat data sent to external servers
- **API Only**: Only messages sent to Google's Gemini API
- **No Tracking**: No analytics or tracking included

## 🔍 Troubleshooting

### Common Issues

**API Key Errors**
- Check if your API key is valid
- Ensure internet connection is stable
- Verify API key permissions

**Chat Not Saving**
- Check if localStorage is enabled
- Clear browser cache if needed
- Ensure browser supports localStorage

**Mobile Issues**
- Use modern mobile browsers
- Check viewport settings
- Ensure touch events work properly

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎨 UI Components

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Background**: Glassmorphism effects
- **Text**: High contrast white/dark
- **Accents**: Subtle transparency layers

### Animations
- Smooth slide-in messages
- Typing indicator dots
- Sidebar transitions
- Button hover effects

## 📄 File Structure

```
chatbot.html
├── HTML Structure
├── CSS Styling
│   ├── Responsive layout
│   ├── Animations
│   └── Theme colors
└── JavaScript
    ├── GeminiChatbot class
    ├── API integration
    ├── History management
    └── UI interactions
```

## 🚀 Advanced Usage

### Extending Functionality
- Add file upload support
- Implement voice input
- Add custom themes
- Create chat export feature

### Integration
- Embed in existing websites
- Add to web applications
- Use as customer support tool
- Educational purposes

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

**Made with ❤️ using Google Gemini AI**

*Ready to chat? Just open the file and start your conversation!*
