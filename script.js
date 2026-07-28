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
});l