// Insights Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeInsightsPage();
});

function initializeInsightsPage() {
    initializeTrendCharts();
    initializeContactForm();
    initializeCalendarWidget();
    initializeScrollAnimations();
    initializeButtonInteractions();
}

function initializeTrendCharts() {
    // Industry Adoption Chart
    const industryChart = echarts.init(document.getElementById('industry-chart'));
    const industryOption = {
        backgroundColor: 'transparent',
        textStyle: {
            color: '#fafafa'
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: '#1a1d29',
            borderColor: '#00d4ff',
            textStyle: {
                color: '#fafafa'
            }
        },
        series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: [
                { value: 28, name: 'Healthcare', itemStyle: { color: '#00d4ff' } },
                { value: 22, name: 'Finance', itemStyle: { color: '#10b981' } },
                { value: 18, name: 'Technology', itemStyle: { color: '#f59e0b' } },
                { value: 15, name: 'Manufacturing', itemStyle: { color: '#8b5cf6' } },
                { value: 10, name: 'Retail', itemStyle: { color: '#ef4444' } },
                { value: 7, name: 'Other', itemStyle: { color: '#6b7280' } }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 212, 255, 0.5)'
                }
            },
            label: {
                color: '#fafafa'
            },
            labelLine: {
                lineStyle: {
                    color: '#6b7280'
                }
            }
        }]
    };
    industryChart.setOption(industryOption);

    // Skills Demand Chart
    const skillsChart = echarts.init(document.getElementById('skills-chart'));
    const skillsOption = {
        backgroundColor: 'transparent',
        textStyle: {
            color: '#fafafa'
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#1a1d29',
            borderColor: '#00d4ff',
            textStyle: {
                color: '#fafafa'
            }
        },
        xAxis: {
            type: 'category',
            data: ['ML Engineering', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps', 'AI Strategy'],
            axisLine: {
                lineStyle: {
                    color: '#6b7280'
                }
            },
            axisLabel: {
                color: '#fafafa',
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#6b7280'
                }
            },
            axisLabel: {
                color: '#fafafa'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        series: [{
            data: [95, 87, 82, 78, 71, 65],
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#00d4ff' },
                    { offset: 1, color: '#0099cc' }
                ])
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 212, 255, 0.5)'
                }
            }
        }]
    };
    skillsChart.setOption(skillsOption);

    // Make charts responsive
    window.addEventListener('resize', function() {
        industryChart.resize();
        skillsChart.resize();
    });
}

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you within 24 hours.');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

function initializeCalendarWidget() {
    const timeSlots = document.querySelectorAll('.time-slot');
    const bookButton = document.getElementById('book-call');
    let selectedTime = null;
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove previous selection
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Add selection
            this.classList.add('selected');
            selectedTime = this.dataset.time;
            
            // Enable book button
            bookButton.disabled = false;
        });
    });
    
    bookButton.addEventListener('click', function() {
        if (selectedTime) {
            const consultationType = document.querySelector('input[name="consultation-type"]:checked').value;
            
            alert(`Booking ${consultationType} consultation for ${selectedTime}...`);
            
            // Simulate booking process
            this.textContent = 'Booking...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('Consultation booked! You\'ll receive a confirmation email shortly.');
                this.textContent = 'Book Selected Time';
                this.disabled = false;
                
                // Reset selection
                timeSlots.forEach(s => s.classList.remove('selected'));
                selectedTime = null;
            }, 2000);
        }
    });
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
                
                // Animate blog cards with stagger
                const blogCards = entry.target.querySelectorAll('.blog-card');
                blogCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Animate charts when they come into view
                if (entry.target.querySelector('.trend-chart')) {
                    setTimeout(() => {
                        // Trigger chart animations
                        const charts = entry.target.querySelectorAll('.trend-chart');
                        charts.forEach(chart => {
                            const chartInstance = echarts.getInstanceByDom(chart);
                            if (chartInstance) {
                                chartInstance.resize();
                            }
                        });
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function initializeButtonInteractions() {
    // Blog card "Read More" buttons
    document.querySelectorAll('.blog-card button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const articleTitle = this.closest('.blog-card').querySelector('h3').textContent;
            alert(`Opening article: "${articleTitle}"...`);
        });
    });
    
    // Newsletter signup
    const newsletterForm = document.querySelector('.newsletter-signup input[type="email"]');
    const subscribeButton = document.querySelector('.newsletter-signup button');
    
    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            const email = newsletterForm.value;
            if (email) {
                alert(`Thank you for subscribing with ${email}! You'll receive our weekly AI insights.`);
                newsletterForm.value = '';
            } else {
                alert('Please enter your email address.');
            }
        });
    }
    
    // Speaking engagement buttons
    document.querySelectorAll('.glass-card button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Speaking Kit')) {
                alert('Downloading Dr. Chen\'s speaking kit with topics, fees, and testimonials...');
            } else if (buttonText.includes('Workshop Topics')) {
                alert('Opening executive workshop catalog with detailed descriptions...');
            } else if (buttonText.includes('Training Options')) {
                alert('Exploring team training programs and customization options...');
            }
        });
    });
    
    // Social media links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('svg').getAttribute('viewBox') ? 'LinkedIn' : 'social media';
            alert(`Opening Dr. Chen's ${platform} profile...`);
        });
    });
    
    // "View All Articles" button
    const viewAllButton = document.querySelector('button:contains("View All Articles")');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            alert('Opening complete blog archive with all articles and insights...');
        });
    }
    
    // Main CTA buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (!button.closest('.blog-card') && !button.closest('.glass-card') && !button.closest('.newsletter-signup')) {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                if (buttonText.includes('Consultation')) {
                    alert('Opening consultation booking calendar...');
                }
            });
        }
    });
}

// Add CSS for blog card animations
const style = document.createElement('style');
style.textContent = `
    .blog-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .trend-chart {
        opacity: 0;
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);