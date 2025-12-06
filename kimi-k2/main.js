// AI Expert CV Website - Main JavaScript

// Global variables
let currentQuestionIndex = 0;
let quizScore = 0;
let userAnswers = [];

// Quiz questions database
const quizQuestions = [
    {
        question: "What is the primary difference between supervised and unsupervised learning?",
        options: [
            "Supervised learning uses labeled data, unsupervised learning does not",
            "Supervised learning is faster than unsupervised learning",
            "Unsupervised learning requires more computational power",
            "There is no significant difference"
        ],
        correct: 0,
        explanation: "Supervised learning uses labeled training data where the desired output is known, while unsupervised learning finds patterns in unlabeled data."
    },
    {
        question: "Which algorithm is commonly used for image classification tasks?",
        options: [
            "Linear regression",
            "Convolutional Neural Networks (CNNs)",
            "K-means clustering",
            "Decision trees"
        ],
        correct: 1,
        explanation: "CNNs are specifically designed for processing grid-like data such as images, making them ideal for image classification."
    },
    {
        question: "What does 'overfitting' mean in machine learning?",
        options: [
            "The model trains too quickly",
            "The model performs well on training data but poorly on new data",
            "The model uses too little data",
            "The model is too simple"
        ],
        correct: 1,
        explanation: "Overfitting occurs when a model learns the training data too well, including its noise and peculiarities, reducing its ability to generalize."
    },
    {
        question: "Which of these is a common application of Natural Language Processing (NLP)?",
        options: [
            "Image recognition",
            "Stock price prediction",
            "Sentiment analysis of text",
            "Weather forecasting"
        ],
        correct: 2,
        explanation: "Sentiment analysis is a classic NLP application that determines the emotional tone or opinion expressed in text."
    },
    {
        question: "What is the purpose of a validation set in machine learning?",
        options: [
            "To train the model",
            "To test the final model performance",
            "To tune hyperparameters and prevent overfitting",
            "To increase the training data size"
        ],
        correct: 2,
        explanation: "The validation set is used to tune model hyperparameters and make decisions about model architecture without touching the test set."
    },
    {
        question: "Which metric would be most appropriate for evaluating a binary classification model?",
        options: [
            "Mean squared error",
            "Accuracy, Precision, Recall, and F1-score",
            "R-squared",
            "Mean absolute error"
        ],
        correct: 1,
        explanation: "For binary classification, we use metrics like accuracy, precision, recall, and F1-score that are designed for classification tasks."
    },
    {
        question: "What is transfer learning in deep learning?",
        options: [
            "Moving data from one computer to another",
            "Using a pre-trained model on a new, similar task",
            "Learning from multiple data sources simultaneously",
            "Transferring knowledge between different algorithms"
        ],
        correct: 1,
        explanation: "Transfer learning involves using a model trained on one task as a starting point for a related task, saving training time and resources."
    },
    {
        question: "What is the main advantage of using ensemble methods?",
        options: [
            "They train faster than single models",
            "They reduce overfitting and improve prediction accuracy",
            "They require less data",
            "They are easier to interpret"
        ],
        correct: 1,
        explanation: "Ensemble methods combine multiple models to improve prediction accuracy and reduce the risk of overfitting."
    }
];

// Neural network visualization using p5.js
let neuralNetwork;
let nodes = [];
let connections = [];
let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('neural-network');
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1');
    
    // Create neural network nodes
    createNeuralNetwork();
    
    // Initialize particles
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    clear();
    
    // Draw connections
    stroke(0, 212, 255, 30);
    strokeWeight(1);
    for (let conn of connections) {
        line(conn.from.x, conn.from.y, conn.to.x, conn.to.y);
    }
    
    // Draw nodes
    for (let node of nodes) {
        node.update();
        node.display();
    }
    
    // Update and draw particles
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
}

function createNeuralNetwork() {
    nodes = [];
    connections = [];
    
    // Create layers
    let layers = [
        { count: 4, x: width * 0.2, yRange: height * 0.6 },
        { count: 6, x: width * 0.4, yRange: height * 0.8 },
        { count: 5, x: width * 0.6, yRange: height * 0.7 },
        { count: 3, x: width * 0.8, yRange: height * 0.5 }
    ];
    
    // Create nodes
    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        for (let j = 0; j < layer.count; j++) {
            let y = (height - layer.yRange) / 2 + (layer.yRange / (layer.count - 1)) * j;
            nodes.push(new Node(layer.x, y));
        }
    }
    
    // Create connections between adjacent layers
    let nodeIndex = 0;
    for (let i = 0; i < layers.length - 1; i++) {
        let currentLayerSize = layers[i].count;
        let nextLayerSize = layers[i + 1].count;
        
        for (let j = 0; j < currentLayerSize; j++) {
            for (let k = 0; k < nextLayerSize; k++) {
                connections.push({
                    from: nodes[nodeIndex + j],
                    to: nodes[nodeIndex + currentLayerSize + k]
                });
            }
        }
        nodeIndex += currentLayerSize;
    }
}

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(4, 8);
        this.pulse = random(TWO_PI);
        this.pulseSpeed = random(0.02, 0.05);
    }
    
    update() {
        this.pulse += this.pulseSpeed;
    }
    
    display() {
        let alpha = map(sin(this.pulse), -1, 1, 50, 150);
        fill(0, 212, 255, alpha);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }
}

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        let connection = random(connections);
        this.x = connection.from.x;
        this.y = connection.from.y;
        this.targetX = connection.to.x;
        this.targetY = connection.to.y;
        this.speed = random(0.5, 2);
        this.progress = 0;
    }
    
    update() {
        this.progress += this.speed / 100;
        
        if (this.progress >= 1) {
            this.reset();
        } else {
            this.x = lerp(this.x, this.targetX, this.progress);
            this.y = lerp(this.y, this.targetY, this.progress);
        }
    }
    
    display() {
        fill(0, 212, 255, 200);
        noStroke();
        ellipse(this.x, this.y, 3);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    createNeuralNetwork();
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize quiz
    initializeQuiz();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize button interactions
    initializeButtonInteractions();
}



function initializeQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const resultsCard = document.getElementById('results-card');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Set total questions
    totalQuestionsSpan.textContent = quizQuestions.length;
    
    // Load first question
    loadQuestion();
    
    // Event listeners
    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    
    function loadQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        questionText.textContent = question.question;
        currentQuestionSpan.textContent = currentQuestionIndex + 1;
        
        // Update progress bar
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressBar.style.width = progress + '%';
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Create option buttons
        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option p-4 border border-gray-600 rounded-lg';
            optionDiv.textContent = option;
            optionDiv.dataset.index = index;
            
            // Check if this option was previously selected
            if (userAnswers[currentQuestionIndex] === index) {
                optionDiv.classList.add('selected');
                nextBtn.disabled = false;
            }
            
            optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
            optionsContainer.appendChild(optionDiv);
        });
        
        // Update button states
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined;
        
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextBtn.textContent = 'See Results';
        } else {
            nextBtn.textContent = 'Next';
        }
    }
    
    function selectOption(optionIndex, optionElement) {
        // Remove previous selection
        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selection to clicked option
        optionElement.classList.add('selected');
        
        // Store answer
        userAnswers[currentQuestionIndex] = optionIndex;
        
        // Enable next button
        nextBtn.disabled = false;
    }
    
    function previousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    }
    
    function nextQuestion() {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            showResults();
        }
    }
    
    function showResults() {
        // Calculate score
        quizScore = 0;
        for (let i = 0; i < quizQuestions.length; i++) {
            if (userAnswers[i] === quizQuestions[i].correct) {
                quizScore++;
            }
        }
        
        const percentage = (quizScore / quizQuestions.length) * 100;
        let skillLevel, skillDescription;
        
        if (percentage >= 80) {
            skillLevel = "Advanced";
            skillDescription = "Excellent! You have a strong foundation in AI concepts. Our expert-level training can help you specialize and lead AI initiatives.";
        } else if (percentage >= 60) {
            skillLevel = "Intermediate";
            skillDescription = "Great work! You have solid AI knowledge. Our advanced programs can help you reach expert level and advance your career.";
        } else if (percentage >= 40) {
            skillLevel = "Developing";
            skillDescription = "Good start! You have basic AI understanding. Our comprehensive training programs will build your skills from the ground up.";
        } else {
            skillLevel = "Beginner";
            skillDescription = "Welcome to AI! Our foundational courses are perfect for building your knowledge and confidence in artificial intelligence.";
        }
        
        // Update results display
        document.getElementById('skill-level').textContent = skillLevel;
        document.getElementById('skill-description').textContent = skillDescription;
        
        // Show results, hide quiz
        quizContainer.classList.add('hidden');
        resultsCard.classList.remove('hidden');
        
        // Add event listeners for result buttons
        resultsCard.querySelector('.btn-primary').addEventListener('click', () => {
            alert('Redirecting to personalized training consultation...');
        });
        
        resultsCard.querySelector('.btn-secondary').addEventListener('click', () => {
            resetQuiz();
        });
    }
    
    function resetQuiz() {
        currentQuestionIndex = 0;
        quizScore = 0;
        userAnswers = [];
        
        quizContainer.classList.remove('hidden');
        resultsCard.classList.add('hidden');
        
        loadQuestion();
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate elements with stagger
                const children = entry.target.querySelectorAll('.service-card, .testimonial-card, .hover-lift');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeButtonInteractions() {
    // Add click handlers for all buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle specific button actions
            const buttonText = this.textContent.trim();
            handleButtonAction(buttonText);
        });
    });
}

function handleButtonAction(buttonText) {
    switch(buttonText) {
        case 'Start Your AI Journey':
        case 'Book Free Consultation':
            alert('Opening consultation booking calendar...');
            break;
        case 'Watch Demo':
            alert('Playing demo video...');
            break;
        case 'Get Started':
            alert('Redirecting to individual coaching program...');
            break;
        case 'Get Quote':
            alert('Opening team training configurator...');
            break;
        case 'Schedule Call':
            alert('Opening corporate strategy consultation...');
            break;
        case 'Download AI Roadmap':
            alert('Downloading AI learning roadmap PDF...');
            break;
        default:
            // For buttons without specific handlers
            if (buttonText.includes('Personalized Training') || buttonText.includes('Consultation')) {
                alert('Opening booking system...');
            }
    }
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .service-card, .testimonial-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(style);transition: all 0.6s ease;
    }
`;
document.head.appendChild(style);