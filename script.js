document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('heroVideo');
    if (!heroVideo) return; 

    heroVideo.addEventListener('loadedmetadata', () => {});
    heroVideo.addEventListener('error', () => {
        console.error('Error loading video. Please check the file path.');
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    function checkScroll() {
        document.querySelectorAll('section').forEach(section => {
            const top = section.getBoundingClientRect().top;
            if (top < window.innerHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.');
            contactForm.reset();
        });
    }

    loadDynamicContent();
});

function loadDynamicContent() {
    const savedData = localStorage.getItem('skyItems');
    if (savedData) {
        currentItemData = JSON.parse(savedData);
    }
    for (let i = 1; i <= 4; i++) {
        const itemId = `item${i}`;
        const item = currentItemData[itemId];
        if (!item) continue;
        const nameEl = document.getElementById(`${itemId}-name`);
        const descEl = document.getElementById(`${itemId}-desc`);
        const priceEl = document.getElementById(`${itemId}-price`);
        const imgEl = document.querySelector(`.item-card:nth-child(${i}) .item-image img`);
        if (nameEl) nameEl.textContent = item.name;
        if (descEl) descEl.textContent = item.description;
        if (priceEl) priceEl.textContent = item.price;
        if (imgEl && item.image) imgEl.src = item.image;
    }
}