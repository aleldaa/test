// Smooth scrolling for navigation links
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

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add some animation to skill cards
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add click functionality to CTA button
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Add some personality with a typing effect for the hero title
function typeWriter(element, text, speed = 100) {
    // Store the original HTML content
    const originalHTML = element.innerHTML;
    
    // Create a temporary element to work with text content only
    const tempElement = document.createElement('div');
    tempElement.innerHTML = originalHTML;
    const textContent = tempElement.textContent || tempElement.innerText || '';
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < textContent.length) {
            // Reconstruct the HTML with the current text progress
            let currentText = textContent.substring(0, i + 1);
            
            // Find the highlight span and preserve it
            const highlightMatch = originalHTML.match(/<span class="highlight">(.*?)<\/span>/);
            if (highlightMatch) {
                const highlightText = highlightMatch[1];
                const highlightIndex = textContent.indexOf(highlightText);
                
                if (i >= highlightIndex && i < highlightIndex + highlightText.length) {
                    // We're typing the highlighted part
                    const beforeHighlight = textContent.substring(0, highlightIndex);
                    const currentHighlight = textContent.substring(highlightIndex, i + 1);
                    const afterHighlight = textContent.substring(i + 1);
                    
                    element.innerHTML = beforeHighlight + 
                        `<span class="highlight">${currentHighlight}</span>` + 
                        afterHighlight;
                } else if (i < highlightIndex) {
                    // We're typing before the highlight
                    element.innerHTML = currentText;
                } else {
                    // We're typing after the highlight
                    const beforeHighlight = textContent.substring(0, highlightIndex);
                    const highlightSpan = highlightMatch[0];
                    const afterHighlight = textContent.substring(highlightIndex + highlightText.length, i + 1);
                    
                    element.innerHTML = beforeHighlight + highlightSpan + afterHighlight;
                }
            } else {
                // No highlight span, just type normally
                element.innerHTML = currentText;
            }
            
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    typeWriter(heroTitle, '', 100);
});