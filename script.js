const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
});

const navLinks = document.querySelector('.nav-links');

const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
});

const sections = document.querySelectorAll('section');
sections.forEach(function(section){
    observer.observe(section);
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


const particles = [];
const particleCount= 80;


for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}


const mouse = { x: null, y: null };
canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX - canvas.getBoundingClientRect().left;
    mouse.y = e.clientY - canvas.getBoundingClientRect().top;
});


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function(p) {
        //move the particle tiny bit each frame
        p.x += p.vx;
        p.y += p.vy;

        //push the particles away if the mouse is nearby
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
            p.x += dx * 0.03;
            p.y += dy * 0.03;
        }

        //if it drifts off one edge then bring it back in from the opposite edge
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        //draw the particles as a small circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#3fb950';
        ctx.fill();
    });

    //run the animate code again after the page refreshment
    requestAnimationFrame(animate);
}

animate();

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// keeps track of which images belong to the group that's currently open,
// and which one of them we're looking at right now
let currentGroupImages = [];
let currentImageIndex = 0;

function showImage(index) {
  currentImageIndex = index;
  lightboxImg.src = currentGroupImages[index].src;
}

// there can be more than one photo group on the page (project screenshots,
// personal gallery, etc), so we go through each one separately and only
// let the arrows move within that same group
document.querySelectorAll('.lightbox-group').forEach(function(group) {
  const imagesInGroup = group.querySelectorAll('img');
  imagesInGroup.forEach(function(img, index) {
    img.addEventListener('click', function() {
      currentGroupImages = Array.from(imagesInGroup);
      showImage(index);
      lightbox.classList.add('active');
    });
  });
});

lightboxPrev.addEventListener('click', function(e) {
  e.stopPropagation();
  const newIndex = (currentImageIndex - 1 + currentGroupImages.length) % currentGroupImages.length;
  showImage(newIndex);
});

lightboxNext.addEventListener('click', function(e) {
  e.stopPropagation();
  const newIndex = (currentImageIndex + 1) % currentGroupImages.length;
  showImage(newIndex);
});

lightbox.addEventListener('click', function() {
  lightbox.classList.remove('active');
});