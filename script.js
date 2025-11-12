// EcoCampus Website - Main JavaScript File
// Handles mobile menu, smooth scroll, active navigation, and animations

document.addEventListener('DOMContentLoaded', function() {
    console.log('EcoCampus JavaScript initialized');

    // =============================================
    // MOBILE MENU FUNCTIONALITY
    // =============================================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Initialize mobile menu toggle
    function initMobileMenu() {
        if (!mobileMenuButton || !mobileMenu) {
            console.error('Mobile menu elements not found');
            return;
        }

        console.log('Mobile menu elements found, initializing...');

        // Toggle menu on button click
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked');
            mobileMenu.classList.toggle('hidden');
            
            // Add animation class for smooth transition
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.animation = 'slideDown 0.3s ease-out';
            }
        });

        // Close menu when clicking on mobile menu links
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Mobile menu link clicked:', this.getAttribute('href'));
                mobileMenu.classList.add('hidden');
            });
        });

        console.log('Mobile menu initialized successfully');
    }

    // =============================================
    // ACTIVE NAVIGATION ON SCROLL
    // =============================================
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');

        if (sections.length === 0) {
            console.warn('No sections found for active navigation');
            return;
        }

        console.log('Initializing active navigation with', sections.length, 'sections');

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSection = entry.target.getAttribute('id');
                    console.log('Section active:', currentSection);

                    // Update desktop navigation links
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${currentSection}`) {
                            link.classList.add('active');
                            link.classList.remove('text-eco-dark');
                            link.classList.add('text-eco-primary', 'font-semibold');
                        } else {
                            link.classList.remove('active');
                            link.classList.remove('text-eco-primary', 'font-semibold');
                            link.classList.add('text-eco-dark');
                        }
                    });

                    // Update mobile navigation links
                    mobileNavLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${currentSection}`) {
                            link.classList.add('active');
                            link.classList.remove('text-eco-dark');
                            link.classList.add('text-eco-primary', 'font-semibold', 'bg-eco-light/50');
                        } else {
                            link.classList.remove('active');
                            link.classList.remove('text-eco-primary', 'font-semibold', 'bg-eco-light/50');
                            link.classList.add('text-eco-dark');
                        }
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });

        console.log('Active navigation initialized');
    }

    // =============================================
    // SMOOTH SCROLL FUNCTIONALITY
    // =============================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        console.log('Found', links.length, 'smooth scroll links');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    console.log('Smooth scrolling to:', targetId);
                    
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        console.log('Closed mobile menu after navigation');
                    }
                } else {
                    console.warn('Target element not found:', targetId);
                }
            });
        });

        console.log('Smooth scroll initialized');
    }

    // =============================================
    // NAVBAR SCROLL EFFECT
    // =============================================
    function initNavbarScroll() {
        const nav = document.querySelector('nav');
        
        if (!nav) {
            console.warn('Navbar element not found');
            return;
        }

        function updateNavbar() {
            if (window.scrollY > 100) {
                nav.classList.add('bg-white/95', 'shadow-lg', 'backdrop-blur-xl');
                nav.classList.remove('bg-white/80');
            } else {
                nav.classList.remove('bg-white/95', 'shadow-lg', 'backdrop-blur-xl');
                nav.classList.add('bg-white/80');
            }
        }

        // Initial check
        updateNavbar();

        // Update on scroll
        window.addEventListener('scroll', updateNavbar);
        
        console.log('Navbar scroll effect initialized');
    }

    // =============================================
    // CARD ANIMATIONS
    // =============================================
    function initCardAnimations() {
        const cards = document.querySelectorAll('.card-hover');
        
        console.log('Found', cards.length, 'cards for animation');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.6s ease-out';
                    
                    // Stagger animation for multiple cards
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            });
        }, observerOptions);

        // Set initial state and observe
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });

        console.log('Card animations initialized');
    }

    // =============================================
    // CLICK OUTSIDE TO CLOSE MOBILE MENU
    // =============================================
    function initClickOutside() {
        document.addEventListener('click', function(e) {
            if (!mobileMenu || mobileMenu.classList.contains('hidden')) {
                return;
            }

            const isClickInsideMenu = mobileMenu.contains(e.target);
            const isClickOnButton = mobileMenuButton.contains(e.target);

            if (!isClickInsideMenu && !isClickOnButton) {
                console.log('Click outside detected, closing mobile menu');
                mobileMenu.classList.add('hidden');
            }
        });

        console.log('Click outside detection initialized');
    }

    // =============================================
    // TOUCH DEVICE SUPPORT
    // =============================================
    function initTouchSupport() {
        // Add touch-specific improvements
        if ('ontouchstart' in window) {
            console.log('Touch device detected, initializing touch support');
            
            // Improve touch targets
            const touchElements = document.querySelectorAll('.nav-link-mobile, #mobile-menu-button, .btn-primary, .btn-outline');
            touchElements.forEach(element => {
                element.style.minHeight = '44px';
                element.style.minWidth = '44px';
            });
        }
    }

    // =============================================
    // FORM HANDLING
    // =============================================
    function initFormHandling() {
        const contactForm = document.querySelector('form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = formData.get('name') || 'Unknown';
                
                // Simple validation
                let isValid = true;
                const inputs = this.querySelectorAll('input[required], textarea[required]');
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('border-red-500');
                    } else {
                        input.classList.remove('border-red-500');
                    }
                });

                if (isValid) {
                    console.log('Form submitted successfully by:', name);
                    alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.`);
                    this.reset();
                } else {
                    console.log('Form validation failed');
                    alert('Harap lengkapi semua field yang wajib diisi.');
                }
            });

            console.log('Form handling initialized');
        }
    }

    // =============================================
    // LAZY LOADING FOR IMAGES (Future Enhancement)
    // =============================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length > 0) {
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
            
            console.log('Lazy loading initialized for', images.length, 'images');
        }
    }

    // =============================================
    // PERFORMANCE OPTIMIZATIONS
    // =============================================
    function initPerformance() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Heavy operations after scroll stops
            }, 100);
        });

        // Preload critical resources
        function preloadResources() {
            const criticalResources = [
                // Add paths to critical resources if needed
            ];
            
            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = 'style';
                document.head.appendChild(link);
            });
        }

        console.log('Performance optimizations initialized');
    }

    // =============================================
    // ERROR HANDLING
    // =============================================
    function initErrorHandling() {
        // Global error handler
        window.addEventListener('error', function(e) {
            console.error('Global error:', e.error);
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });

        console.log('Error handling initialized');
    }

    // =============================================
    // INITIALIZE ALL COMPONENTS
    // =============================================
    function initializeAll() {
        try {
            console.group('🚀 Initializing EcoCampus Website');
            
            initMobileMenu();
            initActiveNav();
            initSmoothScroll();
            initNavbarScroll();
            initCardAnimations();
            initClickOutside();
            initTouchSupport();
            initFormHandling();
            initLazyLoading();
            initPerformance();
            initErrorHandling();
            
            console.groupEnd();
            console.log('✅ All components initialized successfully');
            
            // Send ready event
            window.dispatchEvent(new Event('ecocampus:ready'));
            
        } catch (error) {
            console.error('❌ Initialization error:', error);
        }
    }

    // Start initialization
    initializeAll();

    // =============================================
    // PUBLIC API (if needed for extensions)
    // =============================================
    window.EcoCampus = {
        version: '1.0.0',
        utils: {
            refreshActiveNav: initActiveNav,
            refreshAnimations: initCardAnimations,
            closeMobileMenu: () => {
                if (mobileMenu) mobileMenu.classList.add('hidden');
            },
            openMobileMenu: () => {
                if (mobileMenu) mobileMenu.classList.remove('hidden');
            }
        }
    };

});

// Additional animation for mobile menu slide down
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Improve mobile menu appearance */
    #mobile-menu {
        transition: all 0.3s ease-in-out;
    }
    
    /* Better focus states for accessibility */
    .nav-link:focus,
    .nav-link-mobile:focus,
    .btn-primary:focus,
    .btn-outline:focus {
        outline: 2px solid #10B981;
        outline-offset: 2px;
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

console.log('EcoCampus JavaScript loaded');