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
    if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
            });
        } else {
            console.warn(`No element found with ID '${targetId}'`);
        }
    } else {
        console.warn(`Invalid target ID '${targetId}'`);
    }
};

// Add Smooth Scroll to Anchors
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            const targetId = event.currentTarget.getAttribute('href');
            if (targetId !== '#') {
                smoothScroll(event);
            }
        });
    });
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
    if (heroSection) {
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

        window.addEventListener('beforeunload', function () {
            clearInterval(intervalId);
        });
    }
});

// Smooth Scrolling Logic for Scroll Section
document.addEventListener('DOMContentLoaded', () => {
    const scrollSection = document.querySelector('.scrolling-section');
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollSection && scrollContainer) {
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
    }
});

// Popup Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const logoLink = document.getElementById('logo-link');
    const popupMenu = document.getElementById('popupMenu');
    const closeMenu = document.getElementById('closeMenu');

    if (logoLink && popupMenu && closeMenu) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            popupMenu.classList.toggle('active');
        });

        closeMenu.addEventListener('click', function() {
            popupMenu.classList.remove('active');
        });

        window.addEventListener('click', function(e) {
            if (e.target === popupMenu) {
                popupMenu.classList.remove('active');
            }
        });
    }
});

// About the Game Modal
document.addEventListener('DOMContentLoaded', () => {
    const aboutGameModal = document.getElementById('aboutGameModal');
    const openAboutGame = document.getElementById('about-game-button');
    const closeAboutGame = document.getElementById('closeAboutGame');
    const backgroundOverlay = document.querySelector('.background-overlay');

    if (aboutGameModal && openAboutGame && closeAboutGame && backgroundOverlay) {
        openAboutGame.addEventListener('click', (e) => {
            e.preventDefault();
            aboutGameModal.classList.add('active');
            backgroundOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        closeAboutGame.addEventListener('click', () => {
            aboutGameModal.classList.remove('active');
            backgroundOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });

        backgroundOverlay.addEventListener('click', (e) => {
            if (e.target === backgroundOverlay) {
                aboutGameModal.classList.remove('active');
                backgroundOverlay.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
});

// Open the Lychee gallery popup
function openLycheeGallery() {
    const lycheeIframe = document.getElementById('lychee-iframe');
    const lycheePopup = document.getElementById('lychee-popup');

    if (lycheeIframe && lycheePopup) {
        lycheeIframe.src = 'https://legacyofatum.com/gallery'; // Replace with your gallery URL
        lycheePopup.style.display = 'flex'; // Show the popup
    }
}

// Event listener for the Explore button
document.addEventListener('DOMContentLoaded', () => {
    const exploreGalleryButton = document.getElementById('explore-gallery-button');
    if (exploreGalleryButton) {
        exploreGalleryButton.addEventListener('click', function(e) {
            e.preventDefault();
            openLycheeGallery();
        });
    }

    // Event listener for the Gallery menu button
    const galleryMenuButton = document.querySelector('.menu-list a[href="#gallery.html"]');
    if (galleryMenuButton) {
        galleryMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            openLycheeGallery();
        });
    }

    // Event listener to close the gallery popup
    const closeLycheePopup = document.getElementById('closeLycheePopup');
    if (closeLycheePopup) {
        closeLycheePopup.addEventListener('click', function() {
            const lycheePopup = document.getElementById('lychee-popup');
            const lycheeIframe = document.getElementById('lychee-iframe');
            if (lycheePopup && lycheeIframe) {
                lycheePopup.style.display = 'none'; // Hide the popup
                lycheeIframe.src = ''; // Clear iframe source when closed
            }
        });
    }

    document.getElementById('lychee-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.getElementById('lychee-iframe').src = '';
        }
    });
});

// JavaScript to Handle Modal Pop-Up
document.addEventListener('DOMContentLoaded', () => {
    const aboutGameButton = document.getElementById('about-game-button');
    const aboutGameModal = document.getElementById('aboutGameModal');
    const closeAboutGame = document.getElementById('closeAboutGame');

    if (aboutGameButton && aboutGameModal && closeAboutGame) {
        // Open the About Game Modal
        aboutGameButton.addEventListener('click', function () {
            aboutGameModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });

        // Close the About Game Modal
        closeAboutGame.addEventListener('click', function () {
            aboutGameModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore background scroll
        });

        // Close the modal when clicking outside the content
        aboutGameModal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Attach hover event listeners to all about-topic elements
    document.querySelectorAll('.about-topic').forEach(topic => {
        const popup = topic.querySelector('.popup-info');

        topic.addEventListener('mouseenter', function () {
            topic.classList.add('popup-active');
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
        });

        topic.addEventListener('mouseleave', function () {
            topic.classList.remove('popup-active');
            popup.style.opacity = '0';
            popup.style.visibility = 'hidden';
        });
    });

    const closeAboutGameWrapper = document.getElementById('closeAboutGameWrapper');
    if (closeAboutGameWrapper) {
        closeAboutGameWrapper.addEventListener('click', function () {
            document.querySelector('.about-game-wrapper').classList.remove('active');
            document.body.style.overflow = ''; // Restore background scroll
        });
    }
});