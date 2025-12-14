// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Animated counter for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Counter animation observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Neural network animation in hero
function createNeuralNetwork() {
    const canvas = document.getElementById('neuralNetwork');
    if (!canvas) return;

    const nodes = [];
    const nodeCount = 50;
    const connections = [];

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.width = '4px';
        node.style.height = '4px';
        node.style.background = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`;
        node.style.borderRadius = '50%';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.transition = 'all 3s ease-in-out';

        canvas.appendChild(node);
        nodes.push({
            element: node,
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2
        });
    }

    // Animate nodes
    function animateNodes() {
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > 100) node.vx *= -1;
            if (node.y < 0 || node.y > 100) node.vy *= -1;

            node.element.style.left = `${node.x}%`;
            node.element.style.top = `${node.y}%`;
        });

        requestAnimationFrame(animateNodes);
    }

    animateNodes();
}

createNeuralNetwork();

// Network connection visualization
function createConnections() {
    const svg = document.getElementById('connections');
    if (!svg) return;

    const nodes = document.querySelectorAll('.connection-map .node');
    const nodePositions = Array.from(nodes).map(node => {
        const rect = node.getBoundingClientRect();
        const parentRect = node.parentElement.getBoundingClientRect();
        return {
            x: rect.left - parentRect.left + rect.width / 2,
            y: rect.top - parentRect.top + rect.height / 2
        };
    });

    // Create connections
    for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
            if (Math.random() > 0.6) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', nodePositions[i].x);
                line.setAttribute('y1', nodePositions[i].y);
                line.setAttribute('x2', nodePositions[j].x);
                line.setAttribute('y2', nodePositions[j].y);
                line.setAttribute('stroke', 'rgba(99, 102, 241, 0.2)');
                line.setAttribute('stroke-width', '2');

                svg.appendChild(line);

                // Animate line
                line.style.strokeDasharray = '1000';
                line.style.strokeDashoffset = '1000';
                line.style.animation = 'drawLine 2s ease-in-out forwards';
                line.style.animationDelay = `${Math.random() * 2}s`;
            }
        }
    }
}

// Add CSS animation for lines
const style = document.createElement('style');
style.textContent = `
    @keyframes drawLine {
        to {
            stroke-dashoffset: 0;
        }
    }
`;
document.head.appendChild(style);

setTimeout(createConnections, 500);

// Resource tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Opportunity filtering
const typeFilter = document.getElementById('typeFilter');
const levelFilter = document.getElementById('levelFilter');
const searchInput = document.getElementById('searchOpportunities');
const opportunityCards = document.querySelectorAll('.opportunity-card');

function filterOpportunities() {
    const typeValue = typeFilter.value;
    const levelValue = levelFilter.value;
    const searchValue = searchInput.value.toLowerCase();

    opportunityCards.forEach(card => {
        const cardType = card.dataset.type;
        const cardLevel = card.dataset.level;
        const cardText = card.textContent.toLowerCase();

        const matchesType = typeValue === 'all' || cardType === typeValue;
        const matchesLevel = levelValue === 'all' || cardLevel === levelValue;
        const matchesSearch = cardText.includes(searchValue);

        if (matchesType && matchesLevel && matchesSearch) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

typeFilter.addEventListener('change', filterOpportunities);
levelFilter.addEventListener('change', filterOpportunities);
searchInput.addEventListener('input', filterOpportunities);

// Bookmark functionality
document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('bookmarked');

        // Add animation
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#10b981';

        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// Newsletter form handling
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const submitBtn = e.target.querySelector('button');

    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Subscribed!';
        submitBtn.style.background = '#10b981';

        setTimeout(() => {
            emailInput.value = '';
            submitBtn.textContent = 'Subscribe';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Card hover effect with tilt
document.querySelectorAll('.about-card, .resource-card, .opportunity-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// CTA button ripple effect
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
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
    });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
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

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance: Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    setActiveNav();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Console message for developers
console.log('%c🤖 American Intelligence Association', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in how this was built? Join our community!', 'font-size: 14px; color: #64748b;');
console.log('%cVisit us at: https://aiassociation.org', 'font-size: 12px; color: #6366f1;');

// Events filtering functionality
const eventFilters = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

eventFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        eventFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');

        const filterType = filter.dataset.filter;

        // Filter event cards
        eventCards.forEach(card => {
            const cardType = card.dataset.type;

            if (filterType === 'all' || cardType === filterType) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Event registration button handlers
document.querySelectorAll('.event-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Registered! ✓';
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
            btn.style.color = 'white';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.disabled = false;
            }, 2000);
        }, 1000);
    });
});

// Member search functionality
const memberSearch = document.getElementById('memberSearch');
const memberCards = document.querySelectorAll('.member-card');

if (memberSearch) {
    memberSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        memberCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const role = card.querySelector('.member-role').textContent.toLowerCase();
            const company = card.querySelector('.member-company').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.skill-tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');

            const matches = name.includes(searchTerm) ||
                           role.includes(searchTerm) ||
                           company.includes(searchTerm) ||
                           tags.includes(searchTerm);

            if (matches) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
}

// Connect button handlers
document.querySelectorAll('.connect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const memberName = btn.closest('.member-card').querySelector('h3').textContent;

        btn.textContent = 'Connecting...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = 'Connected! ✓';
            btn.style.background = '#10b981';

            setTimeout(() => {
                btn.textContent = 'Message';
                btn.style.background = '';
                btn.disabled = false;
            }, 2000);
        }, 800);
    });
});

// Membership button handlers
document.querySelectorAll('.membership-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tier = btn.closest('.pricing-card').querySelector('h3').textContent;
        const price = btn.closest('.pricing-card').querySelector('.amount').textContent;

        // Show modal or redirect to signup (simulated here)
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            alert(`Thank you for choosing the ${tier} tier at $${price}/month!\n\nRedirecting to secure checkout...`);
            btn.textContent = btn.textContent.replace('Processing...', 'Join ' + tier);
            btn.disabled = false;
        }, 1000);
    });
});

// Pricing card hover effect with pricing emphasis
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const amount = card.querySelector('.amount');
        if (amount) {
            amount.style.transform = 'scale(1.1)';
            amount.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', () => {
        const amount = card.querySelector('.amount');
        if (amount) {
            amount.style.transform = 'scale(1)';
        }
    });
});

// Add scroll animation trigger for new sections
const newSections = ['.membership', '.benefits', '.events', '.directory'];

newSections.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
        observer.observe(section);
    }
});

// Animate benefits icons on scroll
const benefitCategories = document.querySelectorAll('.benefit-category');
const benefitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const icon = entry.target.querySelector('.category-icon');
            if (icon) {
                icon.style.animation = 'pulse 1s ease-in-out';
            }
        }
    });
}, { threshold: 0.5 });

benefitCategories.forEach(category => {
    benefitObserver.observe(category);
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Event card date animation
const eventDateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const date = entry.target.querySelector('.event-date');
            if (date) {
                date.style.animation = 'slideInLeft 0.6s ease-out';
            }
        }
    });
}, { threshold: 0.3 });

eventCards.forEach(card => {
    eventDateObserver.observe(card);
});

const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(slideStyle);

// Add hover effect for member avatars
document.querySelectorAll('.avatar-placeholder').forEach(avatar => {
    avatar.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(360deg)';
        this.style.transition = 'transform 0.6s ease';
    });

    avatar.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg)';
    });
});

// Simulate member online status (random)
document.querySelectorAll('.member-card').forEach(card => {
    if (Math.random() > 0.6) {
        const avatar = card.querySelector('.member-avatar');
        const statusDot = document.createElement('div');
        statusDot.style.cssText = `
            position: absolute;
            bottom: 5px;
            left: 5px;
            width: 12px;
            height: 12px;
            background: #10b981;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
        `;
        avatar.appendChild(statusDot);
    }
});

// CTA buttons throughout the site
document.querySelectorAll('.cta-button').forEach(button => {
    if (!button.classList.contains('membership-btn') && button.textContent.includes('Member')) {
        button.addEventListener('click', () => {
            // Smooth scroll to membership section
            const membershipSection = document.getElementById('membership');
            if (membershipSection) {
                membershipSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// Copy contract address functionality
function copyContract() {
    const contractAddress = document.getElementById('contractAddress').textContent;

    // Use the modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(contractAddress).then(() => {
            showCopyFeedback();
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopy(contractAddress);
        });
    } else {
        fallbackCopy(contractAddress);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
}

function showCopyFeedback() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;

    copyBtn.innerHTML = '<span style="font-size: 12px;">✓</span>';
    copyBtn.style.background = '#10b981';

    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = '';
    }, 2000);
}

// Sign Up Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const walletAddress = document.getElementById('walletAddress').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const fullName = document.getElementById('fullName').value.trim();
        const termsAgree = document.getElementById('termsAgree').checked;
        const newsletterOptIn = document.getElementById('newsletterOptIn').checked;

        const submitBtn = signupForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const statusDiv = document.getElementById('signupStatus');

        // Validate Solana wallet address format
        const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
        if (!solanaAddressRegex.test(walletAddress)) {
            showStatus('error', 'Please enter a valid Solana wallet address.');
            return;
        }

        if (!termsAgree) {
            showStatus('error', 'You must agree to the Terms of Service and Privacy Policy.');
            return;
        }

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        statusDiv.className = 'form-status';
        statusDiv.style.display = 'none';

        try {
            // Simulate API call to verify wallet and register user
            // In production, this would call your backend API
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate token verification
            // In production, you would verify the wallet holds AIUSD tokens
            const hasTokens = Math.random() > 0.3; // Simulated check

            if (hasTokens) {
                showStatus('success', `Success! Welcome to the American Intelligence Association. A confirmation email has been sent to ${email}.`);
                signupForm.reset();
            } else {
                showStatus('error', 'Your wallet does not hold AIUSD tokens. Please acquire tokens to join the community.');
            }

        } catch (error) {
            showStatus('error', 'An error occurred during registration. Please try again.');
            console.error('Signup error:', error);
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }

        function showStatus(type, message) {
            statusDiv.className = `form-status ${type}`;
            statusDiv.textContent = message;
            statusDiv.style.display = 'block';

            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 5000);
            }
        }
    });
}
