// Advanced JavaScript functionality for Dinesh Kumar Portfolio

class PortfolioAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTypewriter();
        this.setupParticleSystem();
        this.setupScrollEffects();
        this.setupThemeToggle();
        this.setupFormValidation();
        this.setupSkillAnimations();
        this.setupProjectFilters();
    }
    
    setupTypewriter() {
        const texts = [
            "Hi, I'm Dinesh Kumar – Data Science Explorer 🚀",
            "I build AI-powered applications 🤖",
            "I automate DevOps workflows ⚙️",
            "I love cloud computing ☁️"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typewriterElement = document.getElementById('typewriter-text');
        
        if (!typewriterElement) return;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let speed = isDeleting ? deleteSpeed : typeSpeed;
            
            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(type, speed);
        };
        
        setTimeout(type, 1000);
    }
    
    setupParticleSystem() {
        // Enhanced particle system with custom shapes
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 50,
                        density: { enable: true, value_area: 800 }
                    },
                    color: { value: ['#3B82F6', '#1E40AF', '#60A5FA'] },
                    shape: {
                        type: ['circle', 'triangle', 'polygon'],
                        polygon: { nb_sides: 6 }
                    },
                    opacity: {
                        value: 0.6,
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1 }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1 }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#3B82F6',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: { opacity: 1 }
                        },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    setupScrollEffects() {
        // Navbar scroll effect
        let lastScrollTop = 0;
        const navbar = document.querySelector('nav');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
        
        // Parallax effect for sections
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
        
        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('text-primary', 'font-semibold');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('text-primary', 'font-semibold');
                }
            });
        });
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            html.classList.toggle('dark', savedTheme === 'dark');
        } else if (prefersDark) {
            html.classList.add('dark');
        }
        
        themeToggle?.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
            
            // Add animation to theme toggle button
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                html.classList.toggle('dark', e.matches);
            }
        });
    }
    
    setupFormValidation() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) return;
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('input', () => {
                this.validateField(input);
            });
            
            // Floating label effect
            input.addEventListener('focus', () => {
                const label = input.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.transform = 'translateY(-25px) scale(0.8)';
                    label.style.color = '#3B82F6';
                }
            });
            
            input.addEventListener('blur', () => {
                const label = input.previousElementSibling;
                if (label && label.tagName === 'LABEL' && !input.value) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '';
                }
            });
        });
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                this.submitForm(contactForm);
            }
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        // Remove existing error
        this.removeError(field);
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
        
        if (!isValid) {
            this.showError(field, message);
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showError(field, message) {
        field.classList.add('border-red-500', 'focus:ring-red-500');
        
        const errorElement = document.createElement('p');
        errorElement.className = 'text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }
    
    removeError(field) {
        field.classList.remove('border-red-500', 'focus:ring-red-500');
        
        const existingError = field.parentNode.querySelector('.text-red-500');
        if (existingError) {
            existingError.remove();
        }
    }
    
    async submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Message sent successfully! I'll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    setupSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillProgress = entry.target.querySelector('.skill-progress');
                    const percentage = skillProgress.style.width;
                    
                    // Reset and animate
                    skillProgress.style.width = '0%';
                    setTimeout(() => {
                        skillProgress.style.width = percentage;
                    }, 200);
                    
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');
        
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                projects.forEach(project => {
                    const categories = project.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        project.style.display = 'block';
                        project.classList.add('animate-fade-in');
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Counter Animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.start = 0;
        this.increment = target / (duration / 16);
    }
    
    animate() {
        const timer = setInterval(() => {
            this.start += this.increment;
            this.element.textContent = Math.floor(this.start);
            
            if (this.start >= this.target) {
                this.element.textContent = this.target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioAnimations();
    
    // Initialize counters when they come into view
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const counter = new CounterAnimation(entry.target, target);
                counter.animate();
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // Smooth scroll polyfill for better browser support
    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = function(options) {
            const element = this;
            const targetPosition = element.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = options && options.behavior === 'smooth' ? 1000 : 0;
            let start = null;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                window.scrollTo(0, startPosition + distance * percentage);
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            
            if (duration > 0) {
                window.requestAnimationFrame(step);
            } else {
                window.scrollTo(0, targetPosition);
            }
        };
    }
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}