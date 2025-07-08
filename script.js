 class GeminiChatbot {
            constructor() {
                this.apiKey = 'AIzaSyByAnwkn7jBpAHxI3sWPFWpKN4ZpnDtT8g';
                this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
                this.currentChatId = null;
                this.chatHistory = this.loadChatHistory();
                this.isTyping = false;
                this.chatToDelete = null;
                
                this.initializeElements();
                this.setupEventListeners();
                this.renderChatHistory();
                this.startNewChat();
            }

            initializeElements() {
                this.chatMessages = document.getElementById('chatMessages');
                this.messageInput = document.getElementById('messageInput');
                this.sendButton = document.getElementById('sendButton');
                this.sidebar = document.getElementById('sidebar');
                this.sidebarOverlay = document.getElementById('sidebarOverlay');
                this.chatHistoryList = document.getElementById('chatHistoryList');
            }

            setupEventListeners() {
                this.messageInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });

                this.messageInput.addEventListener('input', () => {
                    this.autoResizeTextarea();
                });

                // Close sidebar when clicking outside
                document.addEventListener('click', (e) => {
                    if (!this.sidebar.contains(e.target) && !e.target.closest('.header-btn')) {
                        this.closeSidebar();
                    }
                });
            }

            autoResizeTextarea() {
                this.messageInput.style.height = 'auto';
                this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
            }

            generateChatId() {
                return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            }

            generateChatTitle(message) {
                const maxLength = 30;
                if (message.length <= maxLength) {
                    return message;
                }
                return message.substring(0, maxLength) + '...';
            }

            startNewChat() {
                this.currentChatId = this.generateChatId();
                this.clearChatDisplay();
                this.showWelcomeMessage();
                this.renderChatHistory();
                this.closeSidebar();
            }

            clearChatDisplay() {
                this.chatMessages.innerHTML = '';
            }

            showWelcomeMessage() {
                this.chatMessages.innerHTML = `
                    <div class="welcome-message">
                        <h2>Welcome to Pannu AI!</h2>
                        <p>Ask me anything - I'm here to help with questions, coding, creative tasks, and more!</p>
                    </div>
                `;
            }

            async sendMessage() {
                const message = this.messageInput.value.trim();
                if (!message || this.isTyping) return;

                // If this is the first message of a new chat, initialize the chat
                if (!this.chatHistory[this.currentChatId]) {
                    this.chatHistory[this.currentChatId] = {
                        id: this.currentChatId,
                        title: this.generateChatTitle(message),
                        messages: [],
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                }

                this.addMessage(message, 'user');
                this.messageInput.value = '';
                this.messageInput.style.height = 'auto';
                this.showTypingIndicator();

                // Add user message to history
                this.chatHistory[this.currentChatId].messages.push({
                    role: 'user',
                    content: message,
                    timestamp: new Date().toISOString()
                });

                try {
                    const response = await this.callGeminiAPI(message);
                    this.hideTypingIndicator();
                    this.addMessage(response, 'ai');
                    
                    // Add AI response to history
                    this.chatHistory[this.currentChatId].messages.push({
                        role: 'ai',
                        content: response,
                        timestamp: new Date().toISOString()
                    });
                    
                    this.chatHistory[this.currentChatId].updatedAt = new Date().toISOString();
                    this.saveChatHistory();
                    this.renderChatHistory();
                    
                } catch (error) {
                    this.hideTypingIndicator();
                    this.addMessage('Sorry, I encountered an error. Please try again.', 'ai');
                    console.error('API Error:', error);
                }
            }

            async callGeminiAPI(message) {
                const requestBody = {
                    contents: [{
                        parts: [{
                            text: message
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                };

                const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    return data.candidates[0].content.parts[0].text;
                } else {
                    throw new Error('Unexpected response format');
                }
            }

            addMessage(text, sender) {
                // Remove welcome message if it exists
                const welcomeMessage = this.chatMessages.querySelector('.welcome-message');
                if (welcomeMessage) {
                    welcomeMessage.remove();
                }

                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}`;
                
                if (sender === 'ai') {
                    messageDiv.innerHTML = this.formatMessage(text);
                } else {
                    messageDiv.textContent = text;
                }

                this.chatMessages.appendChild(messageDiv);
                this.scrollToBottom();
            }

            formatMessage(text) {
                return text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                    .replace(/\n/g, '<br>');
            }

            showTypingIndicator() {
                this.isTyping = true;
                this.sendButton.disabled = true;
                
                const typingDiv = document.createElement('div');
                typingDiv.className = 'typing-indicator';
                typingDiv.id = 'typingIndicator';
                typingDiv.innerHTML = `
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <span>Pannu is thinking...</span>
                `;
                
                this.chatMessages.appendChild(typingDiv);
                this.scrollToBottom();
            }

            hideTypingIndicator() {
                this.isTyping = false;
                this.sendButton.disabled = false;
                
                const typingIndicator = document.getElementById('typingIndicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
            }

            scrollToBottom() {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }

            loadChatHistory() {
                const saved = localStorage.getItem('gemini_chat_history');
                return saved ? JSON.parse(saved) : {};
            }

            saveChatHistory() {
                localStorage.setItem('gemini_chat_history', JSON.stringify(this.chatHistory));
            }

            renderChatHistory() {
                const chats = Object.values(this.chatHistory)
                    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

                if (chats.length === 0) {
                    this.chatHistoryList.innerHTML = `
                        <div class="empty-state">
                            <p>No chat history yet.<br>Start a conversation!</p>
                        </div>
                    `;
                    return;
                }

                this.chatHistoryList.innerHTML = chats.map(chat => {
                    const lastMessage = chat.messages[chat.messages.length - 1];
                    const preview = lastMessage ? 
                        (lastMessage.role === 'user' ? 'You: ' : 'AI: ') + lastMessage.content.substring(0, 50) : 
                        'Empty chat';
                    
                    const date = new Date(chat.updatedAt).toLocaleDateString();
                    const isActive = chat.id === this.currentChatId;
                    
                    return `
                        <div class="chat-history-item ${isActive ? 'active' : ''}" onclick="loadChat('${chat.id}')">
                            <div class="chat-title">${chat.title}</div>
                            <div class="chat-preview">${preview}</div>
                            <div class="chat-date">${date}</div>
                            <div class="chat-actions">
                                <button class="chat-action-btn" onclick="event.stopPropagation(); loadChat('${chat.id}')">Open</button>
                                <button class="chat-action-btn delete" onclick="event.stopPropagation(); showChatDeleteModal('${chat.id}')">Delete</button>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            loadChat(chatId) {
                const chat = this.chatHistory[chatId];
                if (!chat) return;

                this.currentChatId = chatId;
                this.clearChatDisplay();
                
                chat.messages.forEach(msg => {
                    this.addMessage(msg.content, msg.role);
                });
                
                this.renderChatHistory();
                this.closeSidebar();
            }

            deleteChat(chatId) {
                delete this.chatHistory[chatId];
                this.saveChatHistory();
                
                if (this.currentChatId === chatId) {
                    this.startNewChat();
                } else {
                    this.renderChatHistory();
                }
            }

            deleteAllChats() {
                this.chatHistory = {};
                this.saveChatHistory();
                this.startNewChat();
            }

            toggleSidebar() {
                const isOpen = this.sidebar.classList.contains('open');
                if (isOpen) {
                    this.closeSidebar();
                } else {
                    this.openSidebar();
                }
            }

            openSidebar() {
                this.sidebar.classList.add('open');
                this.sidebarOverlay.classList.add('active');
            }

            closeSidebar() {
                this.sidebar.classList.remove('open');
                this.sidebarOverlay.classList.remove('active');
            }
        }

        // Initialize the chatbot
        const chatbot = new GeminiChatbot();

        // Global functions
        function sendMessage() {
            chatbot.sendMessage();
        }

        function toggleSidebar() {
            chatbot.toggleSidebar();
        }

        function startNewChat() {
            chatbot.startNewChat();
        }

        function loadChat(chatId) {
            chatbot.loadChat(chatId);
        }

        function showChatDeleteModal(chatId) {
            chatbot.chatToDelete = chatId;
            document.getElementById('deleteChatModal').classList.add('active');
        }

        function hideChatDeleteModal() {
            document.getElementById('deleteChatModal').classList.remove('active');
            chatbot.chatToDelete = null;
        }

        function confirmDeleteChat() {
            if (chatbot.chatToDelete) {
                chatbot.deleteChat(chatbot.chatToDelete);
                hideChatDeleteModal();
            }
        }

        function showDeleteAllModal() {
            document.getElementById('deleteAllModal').classList.add('active');
        }

        function hideDeleteAllModal() {
            document.getElementById('deleteAllModal').classList.remove('active');
        }

        function deleteAllHistory() {
            chatbot.deleteAllChats();
            hideDeleteAllModal();
        }

        // Auto-focus on input when page loads
        window.addEventListener('load', () => {
            document.getElementById('messageInput').focus();
        });