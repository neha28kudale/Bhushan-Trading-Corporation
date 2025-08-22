// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeProductFilters();
    initializeImageZoom();
    initializeStickyNav();
    initializeCart();
    initializeAnimations();
});

// Enhanced search functionality
function initializeSearch() {
    const searchBox = document.getElementById('searchBox');
    const products = document.querySelectorAll('.product-card');
    
    searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            const desc = product.querySelector('p').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm) || desc.includes(searchTerm);
            
            product.style.opacity = '0';
            setTimeout(() => {
                product.style.display = isVisible ? 'block' : 'none';
                product.style.opacity = isVisible ? '1' : '0';
            }, 200);
        });
    });
}

// Product filtering system
function initializeProductFilters() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <div class="filters">
            <select id="categoryFilter">
                <option value="all">All Categories</option>
                <option value="tools">Tools</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
            </select>
            <select id="priceFilter">
                <option value="all">All Prices</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
            </select>
        </div>
    `;
    
    const productSection = document.getElementById('products');
    productSection.insertBefore(filterContainer, document.getElementById('productList'));
}

// Image zoom functionality
function initializeImageZoom() {
    const productImages = document.querySelectorAll('.product-card img');
    
    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <button class="close-modal">&times;</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').onclick = () => {
                modal.remove();
            };
            
            modal.onclick = (e) => {
                if (e.target === modal) modal.remove();
            };
        });
    });
}

// Sticky navigation
function initializeStickyNav() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= headerHeight) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
}

// Shopping cart functionality
function initializeCart() {
    const cart = {
        items: [],
        total: 0
    };

    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!e.target.href) {
                e.preventDefault();
                const card = this.closest('.product-card');
                const product = {
                    name: card.querySelector('h3').textContent,
                    description: card.querySelector('p').textContent,
                    image: card.querySelector('img').src
                };
                
                showNotification(`Added ${product.name} to cart!`);
            }
        });
    });
}

// Animations
function initializeAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    productCards.forEach(card => {
        observer.observe(card);
    });
}

// Utility function for notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add required CSS
const styles = `
    .sticky {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-bg);
        color: white;
        padding: 1rem;
        border-radius: var(--radius);
        animation: slideIn 0.3s ease;
        z-index: 1000;
    }
    
    .filter-container {
        text-align: center;
        margin: 1rem 0;
    }
    
    .filters select {
        margin: 0.5rem;
        padding: 0.5rem;
        border-radius: var(--radius);
        border: 1px solid #ddd;
    }
    
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);