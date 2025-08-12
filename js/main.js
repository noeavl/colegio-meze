
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


document.addEventListener('DOMContentLoaded', function () {
    const cardProgram = document.querySelectorAll('.fade-down')
    const cardContact = document.querySelectorAll('.card-contact-fade-down')
    const cardFadeLeft = document.querySelectorAll('.card-fade-left')
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-down')) {
                    entry.target.classList.remove('translate-y-1/5')
                    entry.target.classList.add('opacity-100', 'ease-in-out')
                } else if (entry.target.classList.contains('card-contact-fade-down')) {
                    entry.target.classList.replace('translate-y-1/2', 'translate-y-0')
                    entry.target.classList.replace('opacity-0', 'opacity-100')
                } else {
                    entry.target.classList.remove('translate-x-1/2')
                    entry.target.classList.add('translate-x-0', 'opacity-100')
                }
                observer.unobserve(entry.target)
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

    cardContact.forEach(card => {
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