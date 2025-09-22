let currentItemData = {
    item1: { 
        name: 'Cape Bintang Malam', 
        description: 'Cape eksklusif dengan pola bintang yang bersinar', 
        price: 'Rp 75.000', 
        image: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Beautiful%20winged%20cape%20from%20Sky%20Children%20of%20the%20Light%20with%20glowing%20edges%20and%20starry%20pattern&id=be61f308-5feb-4a25-8063-b23f1821c9c4' 
    },
    item2: { 
        name: 'Rambut Cahaya', 
        description: 'Gaya rambut eksklusif dengan aksen bercahaya', 
        price: 'Rp 50.000', 
        image: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Unique%20hairstyle%20with%20glowing%20accents%20from%20Sky%20Children%20of%20the%20Light%20game&id=be61f308-5feb-4a25-8063-b23f1821c9c4' 
    },
    item3: { 
        name: 'Seruling Langit', 
        description: 'Alat musik langka dengan suara yang menenangkan', 
        price: 'Rp 100.000', 
        image: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Musical%20instrument%20from%20Sky%20Children%20of%20the%20Light%20with%20ethereal%20glow&id=be61f308-5feb-4a25-8063-b23f1821c9c4' 
    },
    item4: { 
        name: 'Pelampung Cahaya', 
        description: 'Prop eksklusif untuk mempercantik foto Anda', 
        price: 'Rp 65.000', 
        image: 'https://placeholder-image-service.onrender.com/image/300x300?prompt=Prop%20item%20from%20Sky%20Children%20of%20the%20Light%20with%20magical%20glow&id=be61f308-5feb-4a25-8063-b23f1821c9c4' 
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('heroVideo');
    if (!heroVideo) return; // Pastikan ini halaman utama

    // Video event listeners
    heroVideo.addEventListener('loadedmetadata', () => {});
    heroVideo.addEventListener('error', () => {
        console.error('Error loading video. Please check the file path.');
    });

    // Mobile nav toggle
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

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Smooth scroll for anchor links
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

    // Scroll animation for sections
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

    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.');
            contactForm.reset();
        });
    }

    // Load item data from localStorage and update page
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