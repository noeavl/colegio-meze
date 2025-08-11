document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    
    // Detener la animación después de 3 segundos y ocultar el preloader
    setTimeout(function() {
        // Agregar clase para ocultar con animación
        preloader.classList.add('preloader-hidden');
        
        // Mostrar el contenido
        content.classList.add('content-visible');
        
        // Eliminar el preloader del DOM después de la animación
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 800); // Tiempo debe coincidir con la transición CSS
    }, 3500); // 3 segundos de visualización
});