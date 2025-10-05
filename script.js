// Custom JavaScript for Erika Ramírez Santiago Landing Page

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.pain-point, .step, .pricing-card, .how-step');
    animatedElements.forEach(el => observer.observe(el));

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const whatsapp = formData.get('whatsapp');
            
            // Basic validation
            if (!nombre || !email || !whatsapp) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            if (!isValidPhone(whatsapp)) {
                showNotification('Por favor, ingresa un número de WhatsApp válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('¡Gracias! Tu solicitud ha sido enviada. Te contactaremos pronto.', 'success');
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Redirect to WhatsApp (optional)
                const message = encodeURIComponent(`Hola, soy ${nombre}. Me interesa la evaluación gratuita de TCC. Mi email es ${email}.`);
                const urlWhatsapp = `https://wa.me/${525638263959}?text=${mensaje}`;
                
                // Show option to continue to WhatsApp
                setTimeout( () => { //async
                    if (confirm('¿Te gustaría continuar la conversación por WhatsApp?')) {
                        window.open(urlWhatsapp, '_blank');
                    } /*else {
                        showNotification('Enviando tu registro por correo...', 'info');
                        
                        const payload = { nombre, email, whatsapp, ownerEmail: 'santramzbunny82@gmail.com' };
                        const controller = new AbortController();
                        const timeoutMs = 8000;
                        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

                    try {
                        const res = await fetch('/api/registro', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                        signal: controller.signal
                        });
                    
                        clearTimeout(timeoutId);

                        const data = await res.json().catch(() => null);
                    
                        if (res.ok && data && data.success) {
                            showNotification('Registro recibido. Te contactaremos pronto.', 'success');
                        } else {
                            const errMsg = (data && data.error) ? data.error : `Respuesta del servidor: ${res.status}`;
                            showNotification(`Error al enviar registro: ${errMsg}`, 'error');
                            console.error('Error al enviar registro:', data || res);
                        }
                    } catch (err) {
                    
                clearTimeout(timeoutId);
                
                if (err.name === 'AbortError') {
                    showNotification('El envío tardó demasiado y fue cancelado. Intenta de nuevo más tarde.', 'error');
                } else {
                showNotification('No se pudo enviar el registro. Intenta más tarde.', 'error');
                }
                console.error('Fetch error al enviar registro:', err);
                }
            }*/
            }, 2000);
                
            }, 2000);
        });
    }

    // CTA button click tracking
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track CTA clicks (you can integrate with analytics here)
            console.log('CTA clicked:', this.textContent.trim());
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'translateY(0) scale(1.05)';
            }
        });
    });

    // Trust elements animation
    const trustItems = document.querySelectorAll('.trust-item');
    trustItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });

    // Pain points progressive reveal
    const painPoints = document.querySelectorAll('.pain-point');
    const revealPainPoints = () => {
        painPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.opacity = '0';
                point.style.transform = 'translateX(-30px)';
                point.style.transition = 'all 0.8s ease';
                
                setTimeout(() => {
                    point.style.opacity = '1';
                    point.style.transform = 'translateX(0)';
                }, 100);
            }, index * 300);
        });
    };

    // Trigger pain points animation when section is visible
    const painSection = document.querySelector('.pain-section');
    if (painSection) {
        const painObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealPainPoints();
                    painObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        painObserver.observe(painSection);
    }

    // Steps animation
    const steps = document.querySelectorAll('.step');
    const revealSteps = () => {
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '0';
                step.style.transform = 'translateY(30px)';
                step.style.transition = 'all 0.8s ease';
                
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, 100);
            }, index * 400);
        });
    };

    // Trigger steps animation when section is visible
    const solutionSection = document.querySelector('.solution-section');
    if (solutionSection) {
        const solutionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealSteps();
                    solutionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        solutionObserver.observe(solutionSection);
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Mobile menu close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Accessibility: Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#inicio';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid #FF69B4;
            outline-offset: 2px;
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
