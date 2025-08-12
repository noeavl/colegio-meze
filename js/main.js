
// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

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

document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');

    // Detener la animación después de 3 segundos y ocultar el preloader
    setTimeout(function () {
        // Agregar clase para ocultar con animación
        preloader.classList.add('preloader-hidden');

        // Mostrar el contenido
        content.classList.add('content-visible');

        // Eliminar el preloader del DOM después de la animación
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 800); // Tiempo debe coincidir con la transición CSS
    }, 3500); // 3 segundos de visualización
});


/*Animaciones de texto*/

document.addEventListener('DOMContentLoaded', function () {
    const cardProgram = document.querySelectorAll('.fade-down')
    const cardFadeLeft = document.querySelectorAll('.card-fade-left')
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-down')) {
                    entry.target.classList.remove('translate-y-1/5')
                    entry.target.classList.add('opacity-100', 'ease-in-out')
                } else {
                    entry.target.classList.remove('translate-x-1/2')
                    entry.target.classList.add('translate-x-0', 'opacity-100')
                }
            } else {
                if (entry.target.classList.contains('fade-down')) {
                    entry.target.classList.add('translate-y-1/5')
                    entry.target.classList.remove('opacity-100', 'ease-in-out')
                } else {
                    entry.target.classList.remove('opacity-100', 'translate-x-0', 'ease-in-out')
                }
            }
        })
    }, {
        threshold: 0.2
    })

    cardProgram.forEach(card => {
        observer.observe(card)
    })
    cardFadeLeft.forEach(card => {
        observer.observe(card)
    })
})


document.querySelectorAll('.program-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const programItem = button.closest('.program-item');
        const content = programItem.querySelector('.program-content');
        const container = programItem.querySelector('.program-container')
        const icon = button.querySelector('i');

        // Cierra cualquier otro programa que esté abierto
        document.querySelectorAll('.program-item.active').forEach(activeItem => {
            if (activeItem !== programItem) {
                const activeContent = activeItem.querySelector('.program-content');
                const activeContainer = activeItem.querySelector('.program-container');
                const activeIcon = activeItem.querySelector('i');

                activeItem.classList.remove('active');
                activeContent.style.maxHeight = '0';
                activeContainer.classList.remove('gap-3');
                activeIcon.classList.replace('fa-chevron-down', 'fa-chevron-right');
            }
        });

        // Alterna el estado del programa clickeado
        programItem.classList.toggle('active');

        if (programItem.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
            container.classList.add('gap-3');
            icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
        } else {
            content.style.maxHeight = '0';
            container.classList.remove('gap-3');
            icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
        }
    });
});