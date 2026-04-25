/* 
   RACING REVIEWS - MAIN JAVASCRIPT
   This file handles all the interactivity and animations on the site.
   I've added comments to help you understand how each part works.
*/

// Wait for the DOM (HTML structure) to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. MOBILE MENU TOGGLE --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // ONLY run if the hamburger and nav-links exist on the current page
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle the 'active' class on the menu (makes it slide in/out)
            navLinks.classList.toggle('active');
            
            // Optional: Animate the hamburger lines into an 'X'
            hamburger.classList.toggle('toggle');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }


    /* --- 2. SCROLL REVEAL ANIMATIONS --- */
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15 
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });


    /* --- 3. SMOOTH SCROLLING --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault(); 
                const navHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* --- 4. CONTACT FORM HANDLING --- */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameField = contactForm.querySelector('input[type="text"]');
            const emailField = contactForm.querySelector('input[type="email"]');
            
            const name = nameField ? nameField.value : 'Guest';
            const email = emailField ? emailField.value : 'No Email';
            
            alert(`Thanks for reaching out, ${name}! We've received your message and will reply to ${email} soon.`);
            contactForm.reset();
        });
    }


    /* --- 5. STICKY HEADER EFFECT --- */
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
                navbar.style.padding = '10px 5%';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                navbar.style.padding = '15px 5%';
            }
        }
    });


    /* --- 6. SHOP MODAL (CAR POPUP) --- */
    const modal = document.getElementById('carModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const closeModal = document.querySelector('.close-modal');

    // Only run if the modal exists on this page
    if (modal) {
        document.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('click', () => {
                const titleEl = card.querySelector('h3');
                const priceEl = card.querySelector('.price');
                const imgEl = card.querySelector('img');

                if (titleEl && priceEl && imgEl) {
                    modalTitle.innerText = titleEl.innerText;
                    modalPrice.innerText = priceEl.innerText;
                    modalImg.src = imgEl.src;
                    modal.style.display = 'flex';
                }
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                alert(`${modalTitle.innerText} has been added to your cart!`);
                modal.style.display = 'none';
            });
        }
    }
});
