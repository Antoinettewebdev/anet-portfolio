let menulist = document.getElementById("menuList")
let menuIcon = document.querySelector(".bx-menu");
menulist.style.maxHeight = "0px";


// Get all sections and menu items
const sections = document.querySelectorAll('section');
const menuItems = document.querySelectorAll('#menuList li a');


function toggleMenu() { 
    if (menulist.style.maxHeight == "0px") {
        menulist.style.maxHeight = "400px";
         // Change to X mark
        menuIcon.classList.remove("bx-menu");
        menuIcon.classList.add("bx-x");
    } else { 
        menulist.style.maxHeight = "0px";
          // Change back to menu icon
        menuIcon.classList.remove("bx-x");
        menuIcon.classList.add("bx-menu");
    }
}



// Add scroll event listener
window.addEventListener('scroll', () => {
      let current = '';
    const scrollPosition = window.scrollY + 100; // Add offset to improve detection

    // Special handling for the top of the page
    if (scrollPosition < window.innerHeight / 2) {
        current = 'home';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
    }
    
    // Update menu items' active state
    menuItems.forEach(item => {
        item.parentElement.classList.remove('active');
        if (current === 'home' && item.getAttribute('href') === '#home') {
            item.parentElement.classList.add('active');
        } else if (item.getAttribute('href') === `#${current}`) {
            item.parentElement.classList.add('active');
        }
    });
});

// Navigation click handler
menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Close menu after clicking
        menuList.style.maxHeight = "0px";
        menuIcon.classList.remove("bx-x");
        menuIcon.classList.add("bx-menu");
        
        // Handle navigation
        const targetId = href === '#' ? 'home' : href.replace('#', '');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active state
            menuItems.forEach(menuItem => {
                menuItem.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        }
    });
});



// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuList.contains(e.target) && !menuIcon.contains(e.target)) {
        menuList.style.maxHeight = "0px";
        menuIcon.classList.remove("bx-x");
        menuIcon.classList.add("bx-menu");
    }
});