// Improved script for parallax effect and button animations

document.addEventListener('scroll', () => {
    const parallax = document.querySelector('.hero-animation');
    
    if (parallax) {
        let offset = window.pageYOffset;
        parallax.style.backgroundPositionY = `${offset * 0.5}px`;
    }
});

// Function for smooth scroll effect
const smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
        });
    }
}

// Add event listeners to all anchors with href starting with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
});

// Performance optimization for scroll event (requestAnimationFrame)
let latestKnownScrollY = 0;
let ticking = false;

const onScroll = () => {
    latestKnownScrollY = window.scrollY;
    requestTick();
};

const requestTick = () => {
    if (!ticking) {
        requestAnimationFrame(update);
    }
    ticking = true;
};

const update = () => {
    ticking = false;
    // Here you can add further scroll-related functionality if needed
};

window.addEventListener('scroll', onScroll);