// Include header and footer
function includeHTML() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
                initHeader();
            });
    }
    
    if (footerContainer) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            });
    }
}

// Initialize header functionality
function initHeader() {
    // Search functionality
    const navSearchInput = document.getElementById('nav-search-input');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (navSearchInput) {
        navSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

// Search function
function performSearch(query) {
    if (query.trim() !== '') {
        alert(`Searching for: ${query}`);
        // In a real implementation, this would filter tools or navigate to a search results page
    }
}

// Email generation functionality
const domains = ['tempmail.org', 'disposable.com', 'mailinator.net', 'throwaway.me', 'tmpmail.com'];
const adjectives = ['clever', 'quick', 'smart', 'wise', 'bright', 'sharp', 'brilliant'];
const nouns = ['fox', 'eagle', 'hawk', 'lion', 'tiger', 'panther', 'leopard'];

function generateRandomEmail() {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 10000);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    return `${adj}${noun}${num}@${domain}`;
}

function updateEmail() {
    const emailElement = document.getElementById('current-email');
    emailElement.textContent = generateRandomEmail();
    
    // Clear inbox when generating new email
    document.getElementById('inbox-container').innerHTML = 
        '<div class="alert alert-info">Your inbox is empty. Emails will appear here when received.</div>';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    includeHTML();
    
    // Set up event listeners after a brief delay to allow DOM to fully load
    setTimeout(function() {
        updateEmail();
        
        const generateButton = document.getElementById('generate-email');
        const refreshButton = document.getElementById('refresh-inbox');
        const domainOptions = document.querySelectorAll('.domain-option');
        
        if (generateButton) {
            generateButton.addEventListener('click', updateEmail);
        }
        
        if (refreshButton) {
            refreshButton.addEventListener('click', function() {
                // Simulate receiving new emails occasionally
                if (Math.random() > 0.7) {
                    const senders = ['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'Netflix', 'Amazon'];
                    const subjects = ['Verify your account', 'Welcome to our service', 'Confirm your subscription', 'Password reset request'];
                    
                    const sender = senders[Math.floor(Math.random() * senders.length)];
                    const subject = subjects[Math.floor(Math.random() * subjects.length)];
                    const time = 'Just now';
                    
                    const inbox = document.getElementById('inbox-container');
                    const alert = inbox.querySelector('.alert');
                    
                    if (alert) {
                        inbox.innerHTML = '';
                    }
                    
                    inbox.innerHTML = `
                        <div class="message-item">
                            <div class="d-flex justify-content-between">
                                <h6 class="mb-1">${sender}</h6>
                                <small class="text-muted">${time}</small>
                            </div>
                            <p class="mb-0">${subject}</p>
                            <small class="text-muted">Click to view this message</small>
                        </div>
                    ` + inbox.innerHTML;
                }
            });
        }
        
        // Domain selection
        if (domainOptions) {
            domainOptions.forEach(option => {
                option.addEventListener('click', function() {
                    domainOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                    // In a real implementation, this would change the email domain
                });
            });
        }
    }, 100);
});