document.addEventListener("DOMContentLoaded", function() {

    // --- ACTIVE NAV LINK ---
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // On page load, check if the user previously chose light mode
    if (localStorage.getItem('theme') === 'light') {
        body.classList.remove('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save the user's preference
        if (body.classList.contains('dark-mode')) {
            // If we're back to the default (dark), remove the preference
            localStorage.removeItem('theme');
        } else {
            // If we're on the non-default (light), save it
            localStorage.setItem('theme', 'light');
        }
    });

    // --- TYPING EFFECT ---
    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        const words = ["Creator", "Thinker", "Innovator"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const typingSpeed = isDeleting ? 75 : 150;
            typingElement.textContent = currentWord.substring(0, charIndex);
            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }
            setTimeout(type, isDeleting && charIndex === currentWord.length ? 1500 : typingSpeed);
        }
        type();
    }

    // --- CANVAS STARFIELD ---
    const canvas = document.getElementById('starfield');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        const numStars = 200;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = []; // Reset stars on resize
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.2,
                    vx: (Math.random() - 0.5) * 0.1, // Slower velocity
                    vy: (Math.random() - 0.5) * 0.1
                });
            }
        }
        
        resizeCanvas();

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(201, 209, 217, 0.7)'; // Star color
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function update() {
            stars.forEach(star => {
                star.x += star.vx;
                star.y += star.vy;
                if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
                if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
            });
        }

        function animate() {
            if (body.classList.contains('dark-mode')) {
                draw();
                update();
            }
            requestAnimationFrame(animate);
        }
        
        animate();

        window.addEventListener('resize', resizeCanvas);
    }
});