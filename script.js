// ===================================
// Noha Younis - Voice Over Portfolio
// JavaScript Functionality
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initAudioPlayers();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initDemoFilters();
    initScriptToggles();
});

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

// ===================================
// Audio Players
// ===================================
function initAudioPlayers() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    let currentAudio = null;
    let currentPlayBtn = null;
    
    audioPlayers.forEach(player => {
        const playBtn = player.querySelector('.play-btn');
        const progressContainer = player.querySelector('.progress-container');
        const progressBar = player.querySelector('.progress-bar');
        const durationDisplay = player.querySelector('.duration');
        const audioSrc = player.getAttribute('data-src');
        
        // Create audio element
        const audio = new Audio(audioSrc);
        
        // Load audio metadata
        audio.addEventListener('loadedmetadata', function() {
            durationDisplay.textContent = formatTime(audio.duration);
        });
        
        // Handle audio loading errors
        audio.addEventListener('error', function(e) {
            console.log('Audio loading error for:', audioSrc);
            durationDisplay.textContent = '--:--';
        });
        
        // Play/Pause functionality
        playBtn.addEventListener('click', function() {
            if (currentAudio && currentAudio !== audio) {
                // Pause previously playing audio
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentPlayBtn) {
                    currentPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                    currentPlayBtn.classList.remove('playing');
                }
            }
            
            if (audio.paused) {
                audio.play().catch(e => console.log('Playback failed:', e));
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                playBtn.classList.add('playing');
                currentAudio = audio;
                currentPlayBtn = playBtn;
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                playBtn.classList.remove('playing');
            }
        });
        
        // Update progress bar
        audio.addEventListener('timeupdate', function() {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
            durationDisplay.textContent = formatTime(audio.currentTime);
        });
        
        // Audio ended
        audio.addEventListener('ended', function() {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.classList.remove('playing');
            progressBar.style.width = '0%';
            durationDisplay.textContent = formatTime(audio.duration);
        });
        
        // Click on progress bar to seek
        progressContainer.addEventListener('click', function(e) {
            const rect = progressContainer.getBoundingClientRect();
            const clickPosition = (e.clientX - rect.left) / rect.width;
            audio.currentTime = clickPosition * audio.duration;
        });
    });
    
    // Format time helper
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
}

// ===================================
// Demo Filters
// ===================================
function initDemoFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const demoCards = document.querySelectorAll('.demo-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            demoCards.forEach(card => {
                const lang = card.getAttribute('data-lang');
                
                if (filter === 'all') {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else if (lang === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===================================
// Script Toggles
// ===================================
function initScriptToggles() {
    const toggleBtns = document.querySelectorAll('.script-toggle');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const scriptContent = this.nextElementSibling;
            scriptContent.classList.toggle('show');
            
            // Update button text
            if (scriptContent.classList.contains('show')) {
                this.innerHTML = '<i class="fas fa-times"></i> Hide Script';
            } else {
                // Check for Arabic
                const isArabic = document.documentElement.lang === 'ar';
                this.innerHTML = isArabic 
                    ? '<i class="fas fa-file-alt"></i> عرض النص'
                    : '<i class="fas fa-file-alt"></i> View Script';
            }
        });
    });
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll(
        '.demo-card, .service-card, .skill-item, .studio-feature, ' +
        '.about-content, .about-image, .contact-info, .contact-form-container, ' +
        '.section-header, .studio-content, .studio-visual'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = (index % 6) * 0.1 + 's';
        observer.observe(el);
    });
    
    // Add CSS class for animated elements
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// Contact Form
// ===================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!data.name || !data.email || !data.message) {
                const isArabic = document.documentElement.lang === 'ar';
                showNotification(
                    isArabic ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill in all required fields.',
                    'error'
                );
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const isArabic = document.documentElement.lang === 'ar';
                showNotification(
                    isArabic ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.',
                    'error'
                );
                return;
            }
            
            // Simulate form submission (replace with actual backend integration)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const isArabic = document.documentElement.lang === 'ar';
            submitBtn.innerHTML = isArabic 
                ? '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...'
                : '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Create mailto link with form data
            const subject = encodeURIComponent(`Voice Over Project Inquiry - ${data['project-type'] || 'General'}`);
            const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nProject Type: ${data['project-type'] || 'Not specified'}\n\nMessage:\n${data.message}`);
            
            // Simulate API call then open mail client
            setTimeout(function() {
                window.location.href = `mailto:nohayounis1681@gmail.com?subject=${subject}&body=${body}`;
                showNotification(
                    isArabic ? 'شكراً! سيتم فتح برنامج البريد الإلكتروني.' : 'Thank you! Your email client will open.',
                    'success'
                );
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    const styles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        }
        .notification-success { border-left: 4px solid #10b981; }
        .notification-success i:first-child { color: #10b981; }
        .notification-error { border-left: 4px solid #ef4444; }
        .notification-error i:first-child { color: #ef4444; }
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #9ca3af;
            padding: 5px;
            margin-left: auto;
        }
        .notification-close:hover { color: #4b5563; }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(function() {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===================================
// Parallax Effect
// ===================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c🎙️ Noha Younis - Voice Over Artist', 'font-size: 20px; font-weight: bold; color: #147d7d;');
console.log('%cLooking for a professional voice? Contact me!', 'font-size: 14px; color: #d4a418;');
console.log('%c📧 nohayounis1681@gmail.com', 'font-size: 12px; color: #666;');
