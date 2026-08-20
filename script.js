const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
});

const navLinks = document.querySelector('.nav-links');

// types out the About Me text one character at a time, only the first time
// the section scrolls into view, so it reads like it's being written live
const aboutTextElements = document.querySelectorAll('.about p, .about h3');

// grab the real text and immediately blank the page out, before the user
// ever scrolls down here, so About starts empty instead of flashing full text
const aboutOriginalTexts = Array.from(aboutTextElements).map(function(el) {
  return el.textContent;
});
aboutTextElements.forEach(function(el) {
  el.textContent = '';
});

let aboutHasTyped = false;

function typeElement(element, text, speed, onDone) {
  let i = 0;
  const interval = setInterval(function() {
    element.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (onDone) onDone();
    }
  }, speed);
}

function typeAboutText() {
  let index = 0;
  function typeNext() {
    if (index >= aboutTextElements.length) return;
    typeElement(aboutTextElements[index], aboutOriginalTexts[index], 4, function() {
      index++;
      typeNext();
    });
  }
  typeNext();
}

const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            if (entry.target.id === 'about' && !aboutHasTyped) {
                aboutHasTyped = true;
                typeAboutText();
            }
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

// duplicate every gallery item once so the strip can loop without a visible jump.
// when scrolling passes the original set, we quietly snap back to the start,
// and because the clone looks identical, nobody notices the seam.
const galleryStrip = document.querySelector('.gallery-strip');
const originalGalleryItems = Array.from(galleryStrip.children);

originalGalleryItems.forEach(function(item) {
  const clone = item.cloneNode(true);
  galleryStrip.appendChild(clone);

  // cloned videos don't start playing on their own, so we nudge them manually
  if (clone.tagName === 'VIDEO') {
    clone.play();
  }
});

galleryStrip.addEventListener('scroll', function() {
  const halfwayPoint = galleryStrip.scrollWidth / 2;
  if (galleryStrip.scrollLeft >= halfwayPoint) {
    galleryStrip.scrollLeft -= halfwayPoint;
  }
});

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


