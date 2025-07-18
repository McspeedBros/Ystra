// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            answer.classList.toggle('active');
            
            // Smooth scroll to the clicked question
            if (item.classList.contains('active')) {
                setTimeout(() => {
                    question.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add fade-in animation for FAQ items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide FAQ items for animation
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Initialize search functionality
    initializeSearch();
});

// Initialize page with fade-in effect
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close all open FAQ items when pressing Escape
        const activeFaqItems = document.querySelectorAll('.faq-item.active');
        activeFaqItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        });
    }
});

// Add search functionality (enhanced)
function searchFAQ(searchTerm) {
    const faqItems = document.querySelectorAll('.faq-item');
    const normalizedSearchTerm = searchTerm.toLowerCase();
    let visibleCount = 0;
    
    faqItems.forEach(item => {
        const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        if (questionText.includes(normalizedSearchTerm) || answerText.includes(normalizedSearchTerm)) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    // Update search results
    const searchResults = document.getElementById('searchResults');
    if (searchTerm.trim() === '') {
        searchResults.textContent = '';
    } else if (visibleCount === 0) {
        searchResults.textContent = 'Geen resultaten gevonden.';
    } else {
        searchResults.textContent = `${visibleCount} ${visibleCount === 1 ? 'resultaat' : 'resultaten'} gevonden.`;
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('faqSearch');
    const clearButton = document.getElementById('clearSearch');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !clearButton || !searchResults) return;

    // Search input event listener
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value;
        searchFAQ(searchTerm);
        
        // Show/hide clear button
        if (searchTerm.trim() !== '') {
            clearButton.classList.add('show');
        } else {
            clearButton.classList.remove('show');
        }
    });

    // Clear button event listener
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        searchFAQ('');
        clearButton.classList.remove('show');
        searchInput.focus();
    });

    // Enter key search
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchFAQ(this.value);
        }
    });
}
function openWhatsAppChat() {
      const phoneNumber = '32475290086'; // Vul hier je telefoonnummer in zonder "+" of "00"
      const message = encodeURIComponent("Hallo, ik heb een vraag voor jullie: ");
      const url = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(url, '_blank');
    }

window.searchFAQ = searchFAQ;
window.openWhatsAppChat = openWhatsAppChat;