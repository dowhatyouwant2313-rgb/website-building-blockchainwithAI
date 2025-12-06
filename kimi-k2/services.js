// Services Page JavaScript

// Global variables for configurator
let currentStep = 1;
let configData = {
    service: '',
    level: '',
    needs: [],
    teamSize: 1
};

// Project data for modal
const projectData = {
    'predictive-healthcare': {
        title: 'Predictive Healthcare Analytics',
        category: 'Healthcare',
        technology: 'Machine Learning',
        challenge: 'A major healthcare system needed to predict patient readmission rates to improve care quality and reduce costs.',
        solution: 'Developed a machine learning model using patient history, treatment data, and demographic information to predict readmission probability with 85% accuracy.',
        results: [
            '40% reduction in readmission rates',
            '$2.3M annual cost savings',
            'Improved patient outcomes',
            '95% model accuracy'
        ],
        timeline: '6 months',
        team: '5 data scientists and healthcare experts'
    },
    'fraud-detection': {
        title: 'Real-time Fraud Detection',
        category: 'Finance',
        technology: 'Deep Learning',
        challenge: 'A financial institution was losing millions to fraudulent transactions and needed real-time detection capabilities.',
        solution: 'Built a deep learning system using neural networks to analyze transaction patterns and detect anomalies in real-time.',
        results: [
            '99.5% fraud detection accuracy',
            '$50M in prevented fraud',
            '0.1 second response time',
            '95% reduction in false positives'
        ],
        timeline: '4 months',
        team: '3 ML engineers and security experts'
    },
    'recommendation-engine': {
        title: 'Personalized Shopping Experience',
        category: 'Retail',
        technology: 'Natural Language Processing',
        challenge: 'An e-commerce platform wanted to increase customer engagement and conversion rates through personalized recommendations.',
        solution: 'Created an NLP-powered recommendation engine that analyzes user behavior, preferences, and purchase history to provide personalized product suggestions.',
        results: [
            '25% increase in revenue',
            '40% improvement in click-through rates',
            '60% increase in customer satisfaction',
            '30% reduction in cart abandonment'
        ],
        timeline: '5 months',
        team: '4 data scientists and product managers'
    },
    'quality-control': {
        title: 'AI-Powered Quality Control',
        category: 'Manufacturing',
        technology: 'Computer Vision',
        challenge: 'A manufacturing company needed to improve product quality while reducing inspection time and costs.',
        solution: 'Implemented a computer vision system using deep learning to automatically inspect products and identify defects with high precision.',
        results: [
            '60% reduction in defects',
            '50% faster inspection process',
            '$1.8M annual savings',
            '99.2% inspection accuracy'
        ],
        timeline: '3 months',
        team: '2 computer vision specialists and engineers'
    },
    'chatbot-nlp': {
        title: 'Intelligent Customer Support',
        category: 'Technology',
        technology: 'Natural Language Processing',
        challenge: 'A tech company needed to handle increasing customer support volume while maintaining quality service.',
        solution: 'Developed an advanced NLP chatbot capable of understanding context, handling complex queries, and escalating when necessary.',
        results: [
            '80% of queries automated',
            '90% customer satisfaction rate',
            '60% reduction in support costs',
            '24/7 availability achieved'
        ],
        timeline: '4 months',
        team: '3 NLP engineers and UX designers'
    },
    'algorithmic-trading': {
        title: 'Algorithmic Trading System',
        category: 'Finance',
        technology: 'Machine Learning',
        challenge: 'An investment firm wanted to optimize their trading strategies using machine learning and real-time market data.',
        solution: 'Built a sophisticated ML system that analyzes market trends, news sentiment, and historical data to make automated trading decisions.',
        results: [
            '35% ROI improvement',
            '25% reduction in risk',
            '99.9% system uptime',
            '$10M additional profits'
        ],
        timeline: '8 months',
        team: '6 quantitative analysts and ML engineers'
    }
};

// Configurator step data
const stepData = {
    1: {
        title: 'Service Type',
        options: ['individual', 'team', 'corporate']
    },
    2: {
        title: 'Experience Level',
        options: ['beginner', 'intermediate', 'advanced', 'expert']
    },
    3: {
        title: 'Specific Needs',
        individual: ['Career transition', 'Skill advancement', 'Project guidance', 'Certification prep'],
        team: ['Upskilling program', 'New technology adoption', 'Process improvement', 'Innovation initiative'],
        corporate: ['AI strategy', 'Digital transformation', 'Competitive advantage', 'Risk management']
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeServicesPage();
});

function initializeServicesPage() {
    initializeConfigurator();
    initializeProjectFilters();
    initializeProjectModals();
    initializeScrollAnimations();
    initializeButtonInteractions();
}

function initializeConfigurator() {
    // Service type selection
    document.querySelectorAll('[data-service]').forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll('[data-service]').forEach(c => c.classList.remove('border-electric-blue'));
            
            // Add selection
            this.classList.add('border-electric-blue');
            configData.service = this.dataset.service;
            
            // Enable next button
            document.getElementById('next-step').disabled = false;
        });
    });
    
    // Experience level selection
    document.querySelectorAll('[data-level]').forEach(card => {
        card.addEventListener('click', function() {
            // Remove previous selection
            document.querySelectorAll('[data-level]').forEach(c => c.classList.remove('border-electric-blue'));
            
            // Add selection
            this.classList.add('border-electric-blue');
            configData.level = this.dataset.level;
            
            // Enable next button
            document.getElementById('next-step').disabled = false;
        });
    });
    
    // Navigation buttons
    document.getElementById('next-step').addEventListener('click', nextStep);
    document.getElementById('prev-step').addEventListener('click', prevStep);
    
    // Result actions
    document.getElementById('book-consultation').addEventListener('click', () => {
        alert('Opening consultation booking calendar...');
    });
    
    document.getElementById('download-proposal').addEventListener('click', () => {
        alert('Generating and downloading your personalized proposal...');
    });
}

function nextStep() {
    if (currentStep < 4) {
        // Hide current step
        document.getElementById(`step-${currentStep}-content`).classList.add('hidden');
        
        // Update step indicators
        document.getElementById(`step-${currentStep}`).classList.add('completed');
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        document.getElementById(`line-${currentStep}`).classList.add('completed');
        
        currentStep++;
        
        // Show next step
        document.getElementById(`step-${currentStep}-content`).classList.remove('hidden');
        document.getElementById(`step-${currentStep}`).classList.add('active');
        
        // Update navigation
        document.getElementById('prev-step').disabled = false;
        document.getElementById('next-step').disabled = true;
        
        // Handle specific step logic
        if (currentStep === 3) {
            populateNeedsOptions();
        } else if (currentStep === 4) {
            generateRecommendation();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(`step-${currentStep}-content`).classList.add('hidden');
        
        // Update step indicators
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        if (currentStep < 4) {
            document.getElementById(`line-${currentStep}`).classList.remove('completed');
        }
        
        currentStep--;
        
        // Show previous step
        document.getElementById(`step-${currentStep}-content`).classList.remove('hidden');
        document.getElementById(`step-${currentStep}`).classList.add('active');
        document.getElementById(`step-${currentStep}`).classList.remove('completed');
        
        // Update navigation
        document.getElementById('prev-step').disabled = currentStep === 1;
        document.getElementById('next-step').disabled = false;
    }
}

function populateNeedsOptions() {
    const needsContainer = document.getElementById('needs-options');
    const needs = stepData[3][configData.service];
    
    needsContainer.innerHTML = '';
    
    needs.forEach(need => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'service-card p-4 cursor-pointer';
        optionDiv.innerHTML = `
            <h4 class="text-lg font-bold mb-2">${need}</h4>
            <p class="text-sm text-warm-gray">Click to select</p>
        `;
        
        optionDiv.addEventListener('click', function() {
            // Toggle selection
            if (this.classList.contains('border-electric-blue')) {
                this.classList.remove('border-electric-blue');
                configData.needs = configData.needs.filter(n => n !== need);
            } else {
                this.classList.add('border-electric-blue');
                configData.needs.push(need);
            }
            
            // Enable next button if at least one need is selected
            document.getElementById('next-step').disabled = configData.needs.length === 0;
        });
        
        needsContainer.appendChild(optionDiv);
    });
}

function generateRecommendation() {
    const recommendationContent = document.getElementById('recommendation-content');
    
    // Calculate pricing based on selections
    let basePrice = 0;
    let duration = '';
    let packageName = '';
    
    switch(configData.service) {
        case 'individual':
            basePrice = 2500;
            packageName = 'Individual Coaching';
            duration = '8-16 sessions';
            break;
        case 'team':
            basePrice = 8000;
            packageName = 'Team Training';
            duration = '3-6 months';
            break;
        case 'corporate':
            basePrice = 15000;
            packageName = 'Corporate Strategy';
            duration = '6-12 months';
            break;
    }
    
    // Adjust price based on experience level
    const levelMultiplier = {
        'beginner': 1.0,
        'intermediate': 1.2,
        'advanced': 1.5,
        'expert': 2.0
    };
    
    const finalPrice = Math.round(basePrice * levelMultiplier[configData.level]);
    
    recommendationContent.innerHTML = `
        <div class="text-center mb-6">
            <h4 class="text-2xl font-bold mb-2 gradient-text">${packageName}</h4>
            <p class="text-warm-gray">Tailored for ${configData.level} level professionals</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 mb-6">
            <div>
                <h5 class="text-lg font-semibold mb-3">What's Included:</h5>
                <ul class="space-y-2 text-warm-gray">
                    ${configData.needs.map(need => `<li>• ${need}</li>`).join('')}
                    <li>• Personalized curriculum design</li>
                    <li>• Hands-on project work</li>
                    <li>• Career advancement support</li>
                </ul>
            </div>
            <div>
                <h5 class="text-lg font-semibold mb-3">Program Details:</h5>
                <div class="space-y-2 text-warm-gray">
                    <p><strong>Duration:</strong> ${duration}</p>
                    <p><strong>Format:</strong> ${configData.service === 'individual' ? 'One-on-one' : 'Group sessions'}</p>
                    <p><strong>Support:</strong> 24/7 email & chat</p>
                    <p><strong>Certification:</strong> Industry recognized</p>
                </div>
            </div>
        </div>
        
        <div class="text-center bg-electric-blue/10 rounded-lg p-6">
            <div class="text-3xl font-bold gradient-text mb-2">Starting at $${finalPrice.toLocaleString()}</div>
            <p class="text-warm-gray">Flexible payment plans available</p>
        </div>
    `;
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        translateY: [0, -20],
                        duration: 200,
                        easing: 'easeInQuad',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

function initializeProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            showProjectModal(projectId);
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function showProjectModal(projectId) {
    const project = projectData[projectId];
    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    title.textContent = project.title;
    
    body.innerHTML = `
        <div class="mb-6">
            <div class="flex items-center space-x-4 mb-4">
                <span class="bg-electric-blue/20 text-electric-blue px-3 py-1 rounded-full text-sm">${project.category}</span>
                <span class="bg-success-green/20 text-success-green px-3 py-1 rounded-full text-sm">${project.technology}</span>
            </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div>
                <h4 class="text-xl font-bold mb-4">Challenge</h4>
                <p class="text-warm-gray leading-relaxed">${project.challenge}</p>
            </div>
            <div>
                <h4 class="text-xl font-bold mb-4">Solution</h4>
                <p class="text-warm-gray leading-relaxed">${project.solution}</p>
            </div>
        </div>
        
        <div class="mb-8">
            <h4 class="text-xl font-bold mb-4">Results Achieved</h4>
            <div class="grid md:grid-cols-2 gap-4">
                ${project.results.map(result => `
                    <div class="flex items-center space-x-3">
                        <div class="w-2 h-2 bg-success-green rounded-full"></div>
                        <span class="text-warm-gray">${result}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
            <div>
                <h4 class="text-lg font-semibold mb-2">Project Timeline</h4>
                <p class="text-warm-gray">${project.timeline}</p>
            </div>
            <div>
                <h4 class="text-lg font-semibold mb-2">Team Size</h4>
                <p class="text-warm-gray">${project.team}</p>
            </div>
        </div>
        
        <div class="mt-8 text-center">
            <button class="btn-primary mr-4">Discuss Similar Project</button>
            <button class="btn-primary bg-transparent border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-navy">View Case Study</button>
        </div>
    `;
    
    modal.classList.add('active');
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
                
                // Animate service cards with stagger
                const serviceCards = entry.target.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function initializeButtonInteractions() {
    // Service package buttons
    document.querySelectorAll('.service-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Get Started')) {
                alert('Redirecting to individual coaching program...');
            } else if (buttonText.includes('Get Quote')) {
                alert('Opening team training configurator...');
            } else if (buttonText.includes('Schedule Call')) {
                alert('Opening corporate strategy consultation...');
            } else if (buttonText.includes('Choose Professional')) {
                alert('Redirecting to professional package enrollment...');
            }
        });
    });
    
    // Main CTA buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (!button.closest('.service-card')) {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                if (buttonText.includes('Consultation')) {
                    alert('Opening consultation booking calendar...');
                } else if (buttonText.includes('Proposal')) {
                    alert('Generating and downloading your personalized proposal...');
                }
            });
        }
    });
}