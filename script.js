// === ПЛАВНАЯ ПРОКРУТКА ===
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#works').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Плавная прокрутка для всех ссылок в меню
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
});

// === АНИМАЦИЯ ПРИ СКРОЛЛЕ ===
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.work-item');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Если элемент в зоне видимости
        if(position.top < window.innerHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Изначально скрываем элементы для анимации
document.querySelectorAll('.work-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
});

// === АВТОЗАПУСК ФОНОВЫХ ВИДЕО ===
function initBackgroundVideos() {
    document.querySelectorAll('.video-container video').forEach(video => {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Пытаемся запустить воспроизведение
        video.play().catch(error => {
            // Игнорируем ошибки автовоспроизведения - это нормально
        });
    });
}

// === ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ===
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем фоновые видео
    initBackgroundVideos();
    
    console.log('Сайт загружен! Видео показываются полностью без обрезки.');
});

// Прокрутка галереи
function scrollGallery(direction) {
    const carousel = document.getElementById('galleryCarousel');
    carousel.scrollBy({
        left: direction,
        behavior: 'smooth'
    });
}

// Автопрокрутка галереи (опционально)
function initGalleryAutoScroll() {
    const carousel = document.getElementById('galleryCarousel');
    let scrollAmount = 0;
    
    setInterval(() => {
        scrollAmount += 300;
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }, 4000);
}

// Добавь в DOMContentLoaded:
// initGalleryAutoScroll(); // Раскомментируй если хочешь автопрокрутку