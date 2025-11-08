// Binary canvas animation
const canvas = document.getElementById('binaryCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate columns when resizing
    const columns = Math.floor(canvas.width / fontSize);
    
    // Reset drops array
    drops.length = 0;
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
}

// Binary rain effect with girly colors
const binaryChars = '01';
const fontSize = 14;
let drops = [];

// Initial setup
resizeCanvas();

// Girly color palette
const colors = [
    'rgba(217, 70, 239, 0.8)',   // Fuchsia
    'rgba(236, 72, 153, 0.8)',   // Pink
    'rgba(251, 207, 232, 0.8)',  // Light pink
    'rgba(139, 92, 246, 0.8)',   // Purple
    'rgba(196, 181, 253, 0.8)',  // Light purple
    'rgba(255, 255, 255, 0.6)'   // White
];

function draw() {
    // Semi-transparent background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    const columns = Math.floor(canvas.width / fontSize);
    
    for (let i = 0; i < columns; i++) {
        // Initialize drop if it doesn't exist
        if (drops[i] === undefined) {
            drops[i] = Math.random() * -100;
        }
        
        // Random binary character
        const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        
        // Random color from girly palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;

        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Animation loop
setInterval(draw, 50);

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Scroll animation for fade-in elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});