// Плавная прокрутка для кнопки "Смотреть работы"
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

// Анимация при скролле
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

// Модальное окно для видео
function initVideoModal() {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <video controls autoplay>
                Ваш браузер не поддерживает видео
            </video>
            <div class="video-info">
                <h3 class="video-title"></h3>
                <p class="video-description"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Открытие модального окна
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('click', function() {
            const video = this.querySelector('video');
            const source = video.querySelector('source').src;
            const workContent = this.closest('.work-item').querySelector('.work-content');
            const title = workContent.querySelector('h3').textContent;
            const description = workContent.querySelector('p').textContent;
            
            openModal(source, title, description);
        });
    });

    // Закрытие модального окна
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(videoSrc, title, description) {
    const modal = document.querySelector('.video-modal');
    const video = modal.querySelector('video');
    const source = video.querySelector('source') || document.createElement('source');
    
    source.src = videoSrc;
    source.type = 'video/mp4';
    if (!video.contains(source)) video.appendChild(source);
    
    modal.querySelector('.video-title').textContent = title;
    modal.querySelector('.video-description').textContent = description;
    
    video.load();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.video-modal');
    const video = modal.querySelector('video');
    
    modal.classList.remove('active');
    video.pause();
    document.body.style.overflow = 'auto';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initVideoModal);

