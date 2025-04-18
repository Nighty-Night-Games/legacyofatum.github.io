document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const scrollContainer = document.querySelector('.scroll-container');
    const entryItem = document.getElementById('entry-item');
    const galleryModal = document.getElementById('gallery-modal');
    const closeGallery = document.getElementById('close-gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.getElementById('close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Function to preload images
    function preloadImages(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Parallax effect
    const parallax = document.querySelector('.hero-animation');
    window.addEventListener('scroll', () => {
        if (parallax) {
            let offset = window.pageYOffset;
            parallax.style.backgroundPositionY = `${offset * 0.5}px`;
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hero background images logic
    const heroBackgrounds = [
        'images/02_Wawat(Night).png',
        'images/02_Into the Desert.png',
        'images/04_Esna at Night (Randsacked).png',
        'images/03_Wawat (Fortress).png',
        'images/04_Esna at Night.png'
    ];
    let currentBackgroundIndex = 0;
    let intervalId;

    preloadImages(heroBackgrounds);

    function setHeroBackground(index) {
        const tempLayer = document.createElement('div');
        tempLayer.className = 'hero-image';
        tempLayer.style.backgroundImage = `url('${heroBackgrounds[index]}')`;
        tempLayer.style.opacity = 0;

        heroSection.appendChild(tempLayer);
        setTimeout(() => { tempLayer.style.opacity = 1; }, 50);
        setTimeout(() => {
            const oldLayers = document.querySelectorAll('.hero-image');
            oldLayers.forEach((layer, i) => {
                if (i < oldLayers.length - 1) { layer.remove(); }
            });
        }, 1000);
    }

    function setNextBackground() {
        currentBackgroundIndex = (currentBackgroundIndex + 1) % heroBackgrounds.length;
        setHeroBackground(currentBackgroundIndex);
    }

    window.onload = function () {
        setHeroBackground(0); // Set initial background
        intervalId = setInterval(setNextBackground, 15000); // Change every 15 seconds
    };

    window.onunload = function () {
        clearInterval(intervalId);
    };

    // Auto-scroll logic
    let scrollPosition = 0;
    let scrollDirection = 1; // 1 for right, -1 for left
    let autoScrollInterval;

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const maxScrollPosition = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            scrollPosition += 1 * scrollDirection;

            if (scrollPosition >= maxScrollPosition || scrollPosition <= 0) {
                scrollDirection *= -1;
            }

            scrollContainer.scrollLeft = scrollPosition;
        }, 10);
    }

    scrollContainer.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });

    scrollContainer.addEventListener('mouseleave', startAutoScroll);

    scrollContainer.addEventListener('wheel', (event) => {
        event.preventDefault();
        clearInterval(autoScrollInterval); // Pause auto-scrolling during manual scroll
        scrollContainer.scrollLeft += event.deltaY * 4;
        scrollPosition = scrollContainer.scrollLeft;
    }, { passive: false });

    window.addEventListener('load', startAutoScroll);

    // Gallery and lightbox logic
    entryItem.addEventListener('click', () => {
        galleryModal.style.display = 'flex';
    });

    closeGallery.addEventListener('click', () => {
        galleryModal.style.display = 'none';
    });

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightboxImage.src = item.src;
            lightbox.style.display = 'flex';
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImage.src = '';
    });

    // Parallax effect for other elements (optional)
    const parallaxElements = document.querySelectorAll('.parallax-background');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            let offset = window.pageYOffset;
            el.style.backgroundPositionY = `${offset * 0.5}px`;
        });
    });
});