// FitCal Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Create a dedicated mobile menu container
    const mobileMenuContainer = document.createElement('div');
    mobileMenuContainer.className = 'mobile-menu-container';
    document.body.appendChild(mobileMenuContainer);
    
    // Create a dedicated close button
    const closeButton = document.createElement('button');
    closeButton.className = 'mobile-menu-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenuContainer.appendChild(closeButton);
    
    // Clone nav links and CTA buttons for mobile menu
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    const mobileNavLinks = navLinks.cloneNode(true);
    const mobileCtaButtons = ctaButtons.cloneNode(true);
    
    // Add cloned elements to mobile menu container
    mobileMenuContainer.appendChild(mobileNavLinks);
    mobileMenuContainer.appendChild(mobileCtaButtons);
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenuContainer.classList.toggle('active');
            
            if (mobileMenuContainer.classList.contains('active')) {
                // Open menu
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                // Close menu
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close button event listener
    closeButton.addEventListener('click', function() {
        mobileMenuContainer.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Event listeners for mobile menu links
    mobileNavLinks.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu
                mobileMenuContainer.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset toggle button appearance
                menuToggle.querySelectorAll('span')[0].style.transform = '';
                menuToggle.querySelectorAll('span')[1].style.opacity = '';
                menuToggle.querySelectorAll('span')[2].style.transform = '';
                
                // Scroll to target
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Event listeners for mobile CTA buttons
    mobileCtaButtons.querySelectorAll('a').forEach(button => {
        button.addEventListener('click', function () {
            // Close mobile menu
            mobileMenuContainer.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset toggle button appearance
            menuToggle.querySelectorAll('span')[0].style.transform = '';
            menuToggle.querySelectorAll('span')[1].style.opacity = '';
            menuToggle.querySelectorAll('span')[2].style.transform = '';
        });
    });
    
    // Smooth scrolling for regular anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.closest('.mobile-menu-container')) {
                return; // Skip, already handled above
            }
            
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Staggered animation on scroll
    const fadeElements = document.querySelectorAll('.feature-card, .process-step, .testimonial-card, .pricing-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 150 * (index % 4)); // Stagger effect for items in rows
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Animate hero section on page load
    const animateHero = () => {
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.add('animate');
            }, 300);
        }
        
        if (heroImage) {
            setTimeout(() => {
                heroImage.classList.add('animate');
            }, 600);
        }
    };
    
    // Animate section titles when they come into view
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    sectionTitles.forEach(title => {
        sectionObserver.observe(title);
    });
    
    // Floating animation for feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Count-up animation for pricing section
    const pricingElements = document.querySelectorAll('.price');
    const countObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const price = parseFloat(target.getAttribute('data-price') || target.innerText);
                
                if (!isNaN(price)) {
                    let startValue = 0;
                    const duration = 1500;
                    const startTime = performance.now();
                    
                    const updateCounter = (timestamp) => {
                        const elapsedTime = timestamp - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        
                        // Ease-out effect
                        const easingProgress = 1 - Math.pow(1 - progress, 3);
                        const currentValue = Math.floor(easingProgress * price);
                        
                        if (target.innerText.includes('$')) {
                            target.innerText = `$${currentValue}`;
                        } else {
                            target.innerText = currentValue;
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.innerText = target.getAttribute('data-price') || price;
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    pricingElements.forEach(element => {
        countObserver.observe(element);
    });
    
    // Call hero animation when page is loaded
    window.addEventListener('load', animateHero);

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        /* Header scroll effect */
        header {
            transition: all 0.3s ease;
        }
        
        header.scrolled {
            padding: 0.5rem 0;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            background-color: rgba(10, 14, 18, 0.95);
        }
        
        /* Hero animations */
        .hero-content, .hero-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .hero-content.animate, .hero-image.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Section title animations */
        .section-title {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-title.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Feature animations */
        .feature-card, .process-step, .testimonial-card, .pricing-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .process-step.animate, .testimonial-card.animate, .pricing-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Feature icon floating animation */
        .feature-icon {
            animation: float 3s ease-in-out infinite;
            animation-play-state: paused;
        }
        
        .feature-card:hover .feature-icon {
            animation-play-state: running;
        }
        
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }
        
        /* CTA hover effect */
        .btn {
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .btn::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            background-color: rgba(255, 255, 255, 0.2);
            transition: height 0.3s ease;
            z-index: -1;
        }
        
        .btn:hover::after {
            height: 100%;
        }
        
        /* Mobile menu animation */
        .mobile-menu-container {
            animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Process step connection lines */
        .process-steps {
            position: relative;
        }
        
        .process-steps::before {
            content: '';
            position: absolute;
            top: 50px;
            left: 10%;
            right: 10%;
            height: 4px;
            background: linear-gradient(90deg, transparent, var(--primary-light), transparent);
            z-index: 0;
        }
    `;
    
    document.head.appendChild(style);
}); 