// script.js
class CoverflowSlider {
    constructor(container) {
        this.container = document.querySelector(container);
        this.stage = this.container.querySelector('.coverflow-stage');
        this.items = this.container.querySelectorAll('.coverflow-item');
        this.prevButton = this.container.querySelector('#prevBtn');
        this.nextButton = this.container.querySelector('#nextBtn');
        
        this.currentIndex = Math.floor(this.items.length / 2);
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.updatePositions();
        this.bindEvents();
        
        // Auto-play functionality (optional)
        // this.startAutoPlay();
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevButton.addEventListener('click', () => this.goToPrev());
        this.nextButton.addEventListener('click', () => this.goToNext());
        
        // Item clicks
        this.items.forEach((item, index) => {
            item.addEventListener('click', (e) => this.handleItemClick(e, index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Touch/swipe support
        this.bindTouchEvents();
        
        // Mouse wheel support
        this.stage.addEventListener('wheel', (e) => this.handleWheel(e));
    }
    
    bindTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.stage.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.stage.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            e.preventDefault();
        });
        
        this.stage.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.goToNext();
                } else {
                    this.goToPrev();
                }
            }
            
            isDragging = false;
        });
    }
    
    handleItemClick(e, index) {
        if (this.currentIndex === index) {
            // If clicking on active item, follow the link
            const action = e.currentTarget.dataset.action;
            if (action) {
                window.open(action, '_blank');
            }
        } else {
            // Navigate to clicked item
            this.goToSlide(index);
        }
    }
    
    handleKeydown(e) {
        switch(e.keyCode) {
            case 37: // Left arrow
                this.goToPrev();
                break;
            case 39: // Right arrow
                this.goToNext();
                break;
        }
    }
    
    handleWheel(e) {
        if (this.isAnimating) return;
        
        e.preventDefault();
        
        if (e.deltaY > 0) {
            this.goToNext();
        } else {
            this.goToPrev();
        }
    }
    
    goToPrev() {
        if (this.isAnimating) return;
        
        this.currentIndex = this.currentIndex > 0 ? 
            this.currentIndex - 1 : this.items.length - 1;
        this.updatePositions();
    }
    
    goToNext() {
        if (this.isAnimating) return;
        
        this.currentIndex = this.currentIndex < this.items.length - 1 ? 
            this.currentIndex + 1 : 0;
        this.updatePositions();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updatePositions();
    }
    
    updatePositions() {
        this.isAnimating = true;
        
        this.items.forEach((item, index) => {
            // Clear all position classes
            item.classList.remove('active', 'left-1', 'left-2', 'left-3', 'right-1', 'right-2', 'right-3');
            
            const position = index - this.currentIndex;
            
            if (position === 0) {
                item.classList.add('active');
            } else if (position === -1) {
                item.classList.add('left-1');
            } else if (position === -2) {
                item.classList.add('left-2');
            } else if (position <= -3) {
                item.classList.add('left-3');
            } else if (position === 1) {
                item.classList.add('right-1');
            } else if (position === 2) {
                item.classList.add('right-2');
            } else if (position >= 3) {
                item.classList.add('right-3');
            }
        });
        
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    startAutoPlay(interval = 4000) {
        this.autoPlayInterval = setInterval(() => {
            this.goToNext();
        }, interval);
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => {
            clearInterval(this.autoPlayInterval);
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.startAutoPlay(interval);
        });
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Initialize the coverflow slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const coverflow = new CoverflowSlider('#coverflowSlider');
});
