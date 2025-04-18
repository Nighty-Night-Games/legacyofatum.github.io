// Parallax Effect and Button Animations
document.addEventListener('scroll', () => {
    const parallax = document.querySelector('.hero-animation');
    if (parallax) {
        let offset = window.pageYOffset;
        parallax.style.backgroundPositionY = `${offset * 0.5}px`;
    }
});

// Smooth Scroll Function
const smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
        });
    }
};

// Add Smooth Scroll to Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
});

// Scroll Performance Optimization
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
    // Additional scroll-related functionality can be added here
};

window.addEventListener('scroll', onScroll);

// Hero Background Switching Logic
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    let currentBackgroundIndex = 0;
    let intervalId;

    const heroBackgrounds = [
        'images/02_Wawat(Night).png',
        'images/02_Into the Desert.png',
        'images/04_Esna at Night (Randsacked).png',
        'images/03_Wawat (Fortress).png',
        'images/04_Esna at Night.png',
    ];

    function preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    function setRandomBackground() {
        currentBackgroundIndex = Math.floor(Math.random() * heroBackgrounds.length);
        setHeroBackground(currentBackgroundIndex);
    }

    function setHeroBackground(index) {
        const tempLayer = document.createElement('div');
        tempLayer.className = 'hero-image';
        tempLayer.style.backgroundImage = `url('${heroBackgrounds[index]}')`;
        tempLayer.style.opacity = 0;

        heroSection.appendChild(tempLayer);
        setTimeout(() => {
            tempLayer.style.opacity = 1;
        }, 50);

        setTimeout(() => {
            const oldLayers = document.querySelectorAll('.hero-image');
            oldLayers.forEach((layer, i) => {
                if (i < oldLayers.length - 1) {
                    layer.remove();
                }
            });
        }, 1000);
    }

    function setNextBackground() {
        currentBackgroundIndex = (currentBackgroundIndex + 1) % heroBackgrounds.length;
        setHeroBackground(currentBackgroundIndex);
    }

    function startAutomaticBackgroundChange() {
        setTimeout(() => {
            intervalId = setInterval(setNextBackground, 15000);
        }, 10000);
    }

    window.onload = function () {
        preloadImages(heroBackgrounds);
        setRandomBackground();
        startAutomaticBackgroundChange();
    };

    window.onunload = function () {
        clearInterval(intervalId);
    };
});

// Smooth Scrolling Logic for Scroll Section
document.addEventListener('DOMContentLoaded', () => {
    const scrollSection = document.querySelector('.scrolling-section');
    const scrollContainer = document.querySelector('.scroll-container');
    let scrollPosition = 0;
    let scrollDirection = 1;
    let autoScrollInterval;
    let isHovering = false;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (!isHovering) {
                const itemWidth = scrollContainer.querySelector('.scroll-item').offsetWidth;
                const gap = parseInt(window.getComputedStyle(scrollContainer).gap) || 0;
                const maxScrollPosition = scrollContainer.scrollWidth - scrollSection.clientWidth + itemWidth + gap;

                scrollPosition += 1 * scrollDirection;

                if (scrollPosition >= maxScrollPosition || scrollPosition <= 0) {
                    scrollDirection *= -1;
                }

                scrollContainer.style.transform = `translateX(${-scrollPosition}px)`;
            }
        }, 60);
    }

    scrollSection.addEventListener('mouseenter', () => {
        isHovering = true;
        clearInterval(autoScrollInterval);
    });

    scrollSection.addEventListener('mouseleave', () => {
        isHovering = false;
        startAutoScroll();
    });

    window.addEventListener('load', () => {
        startAutoScroll();
    });

    scrollSection.addEventListener('wheel', (event) => {
        event.preventDefault();
        clearInterval(autoScrollInterval);
        const itemWidth = scrollContainer.querySelector('.scroll-item').offsetWidth;
        const gap = parseInt(window.getComputedStyle(scrollContainer).gap) || 0;
        const maxScrollPosition = scrollContainer.scrollWidth - scrollSection.clientWidth + itemWidth + gap;

        scrollPosition += event.deltaY * 4;
        scrollPosition = Math.max(0, Math.min(scrollPosition, maxScrollPosition));
        scrollContainer.style.transform = `translateX(${-scrollPosition}px)`;
    }, { passive: false });
});

// Popup Menu Toggle
document.getElementById('logo-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('popupMenu').classList.toggle('active');
});

document.getElementById('closeMenu').addEventListener('click', function () {
    document.getElementById('popupMenu').classList.remove('active');
});

window.addEventListener('click', function (e) {
    const menu = document.getElementById('popupMenu');
    if (e.target === menu) {
        menu.classList.remove('active');
    }
});
// About the Game Modal
document.addEventListener('DOMContentLoaded', () => {
    const aboutGameModal = document.getElementById('aboutGameModal');
    const openAboutGame = document.querySelector('a[href="#about-the-game.html"]');
    const closeAboutGame = document.getElementById('closeAboutGame');

    openAboutGame.addEventListener('click', (e) => {
        e.preventDefault();
        aboutGameModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeAboutGame.addEventListener('click', () => {
        aboutGameModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    aboutGameModal.addEventListener('click', (e) => {
        if (e.target === aboutGameModal) {
            aboutGameModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.getElementById('about-game-button').addEventListener('click', function () {
    document.querySelector('.about-game-modal').classList.add('active');
});

document.querySelector('.close-modal').addEventListener('click', function () {
    document.querySelector('.about-game-modal').classList.remove('active');
});
