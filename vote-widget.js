// Vote Widget for Website Comparison
(function() {
    // Configuration
    const STORAGE_KEY = 'website_votes';
    const IMPLEMENTATIONS = {
        'gemini': 'Gemini Implementation',
        'claude': 'Claude Implementation',
        'minimax': 'MiniMax Implementation',
        'chatgpt': 'ChatGPT Implementation',
        'kimi': 'Kimi K2 Implementation'
    };

    // Get current implementation from path
    function getCurrentImplementation() {
        const path = window.location.pathname;
        if (path.includes('/gemini/')) return 'gemini';
        if (path.includes('/claude/')) return 'claude';
        if (path.includes('/minimax/')) return 'minimax';
        if (path.includes('/chatgpt/')) return 'chatgpt';
        if (path.includes('/kimi-k2/')) return 'kimi';
        return null;
    }

    // Get votes from localStorage
    function getVotes() {
        const votes = localStorage.getItem(STORAGE_KEY);
        return votes ? JSON.parse(votes) : {};
    }

    // Save vote
    function saveVote(implementation) {
        const votes = getVotes();
        votes[implementation] = (votes[implementation] || 0) + 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
        return votes[implementation];
    }

    // Check if user has voted for current implementation
    function hasVoted(implementation) {
        const voted = localStorage.getItem(`voted_${implementation}`);
        return voted === 'true';
    }

    // Mark as voted
    function markAsVoted(implementation) {
        localStorage.setItem(`voted_${implementation}`, 'true');
    }

    // Create widget HTML
    function createWidget() {
        const currentImpl = getCurrentImplementation();
        if (!currentImpl) return;

        const hasUserVoted = hasVoted(currentImpl);
        const votes = getVotes();
        const currentVotes = votes[currentImpl] || 0;

        const widget = document.createElement('div');
        widget.id = 'vote-widget';
        widget.innerHTML = `
            <style>
                #vote-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    padding: 16px 20px;
                    z-index: 9999;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    min-width: 250px;
                    transition: transform 0.3s ease;
                }
                #vote-widget:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
                }
                #vote-widget h3 {
                    margin: 0 0 12px 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: #333;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                #vote-widget .vote-count {
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 12px;
                }
                #vote-widget button {
                    width: 100%;
                    padding: 10px 16px;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    margin-bottom: 8px;
                }
                #vote-widget .vote-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                #vote-widget .vote-btn:hover:not(:disabled) {
                    transform: scale(1.02);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }
                #vote-widget .vote-btn:disabled {
                    background: #e0e0e0;
                    color: #999;
                    cursor: not-allowed;
                }
                #vote-widget .back-btn {
                    background: white;
                    color: #667eea;
                    border: 2px solid #667eea;
                }
                #vote-widget .back-btn:hover {
                    background: #667eea;
                    color: white;
                }
                #vote-widget .voted-msg {
                    color: #10b981;
                    font-size: 12px;
                    text-align: center;
                    margin-top: 4px;
                    font-weight: 500;
                }
                @media (max-width: 640px) {
                    #vote-widget {
                        bottom: 10px;
                        right: 10px;
                        min-width: 200px;
                        padding: 12px 16px;
                    }
                }
            </style>
            <h3>
                <span style="font-size: 18px;">🗳️</span>
                ${IMPLEMENTATIONS[currentImpl]}
            </h3>
            <div class="vote-count">
                ${currentVotes} vote${currentVotes !== 1 ? 's' : ''}
            </div>
            <button class="vote-btn" id="vote-btn" ${hasUserVoted ? 'disabled' : ''}>
                ${hasUserVoted ? '✓ Voted!' : '👍 Vote for this'}
            </button>
            ${hasUserVoted ? '<div class="voted-msg">Thank you for voting!</div>' : ''}
            <button class="back-btn" id="back-btn">
                ← See All Implementations
            </button>
        `;

        document.body.appendChild(widget);

        // Add event listeners
        document.getElementById('vote-btn').addEventListener('click', function() {
            if (!hasVoted(currentImpl)) {
                const newCount = saveVote(currentImpl);
                markAsVoted(currentImpl);
                
                this.disabled = true;
                this.textContent = '✓ Voted!';
                
                document.querySelector('.vote-count').textContent = 
                    `${newCount} vote${newCount !== 1 ? 's' : ''}`;
                
                const votedMsg = document.createElement('div');
                votedMsg.className = 'voted-msg';
                votedMsg.textContent = 'Thank you for voting!';
                this.parentNode.insertBefore(votedMsg, this.nextSibling);
            }
        });

        document.getElementById('back-btn').addEventListener('click', function() {
            // Navigate to root index.html
            const pathParts = window.location.pathname.split('/');
            const depth = pathParts.filter(p => p && p !== 'index.html').length;
            const backPath = '../'.repeat(depth) + 'index.html';
            window.location.href = backPath;
        });
    }

    // Initialize widget when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
})();
