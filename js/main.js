
// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

document.addEventListener('DOMContentLoaded', () => {
    const programButtons = document.querySelectorAll('.program-toggle');

    programButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentContainer = button.closest('.flex.flex-col');
            const currentContent = currentContainer.querySelector('.mt-5');
            const currentIcon = button.querySelector('i');

            // Primero cerramos todos los programas
            programButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    const otherContainer = otherButton.closest('.flex.flex-col');
                    const otherContent = otherContainer.querySelector('.mt-5');
                    const otherIcon = otherButton.querySelector('i');

                    if (otherContent && otherIcon) {
                        otherContent.classList.add('hidden');
                        otherIcon.classList.remove('fa-chevron-down');
                        otherIcon.classList.add('fa-chevron-right');
                    }
                }
            });

            // Luego alternamos el estado del programa actual
            if (currentContent && currentIcon) {
                currentContent.classList.toggle('hidden');
                currentIcon.classList.toggle('fa-chevron-right');
                currentIcon.classList.toggle('fa-chevron-down');
            }
        });
    });
});



mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImageIndex = 0;
const images = [];
const captions = [];

// Prepare images and captions arrays
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('div div h3').textContent + ' - ' + item.querySelector('div div p').textContent;

    images.push(img.src);
    captions.push(caption);

    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightboxImg.src = images[currentImageIndex];
    lightboxCaption.textContent = captions[currentImageIndex];
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightboxFunc() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentImageIndex];
    lightboxCaption.textContent = captions[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImg.src = images[currentImageIndex];
    lightboxCaption.textContent = captions[currentImageIndex];
}

closeLightbox.addEventListener('click', closeLightboxFunc);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeLightboxFunc();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active-nav', 'text-[#174775]');
                link.classList.add('text-gray-600');
            });

            if (targetId !== '#inicio') {
                this.classList.add('active-nav', 'text-[#174775]');
                this.classList.remove('text-gray-600');
            }
        }
    });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active-nav', 'text-[#174775]');
                link.classList.add('text-gray-600');

                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active-nav', 'text-[#174775]');
                    link.classList.remove('text-gray-600');
                }
            });
        }
    });
});
