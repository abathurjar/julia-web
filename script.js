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

// === МОДАЛЬНОЕ ОКНО ДЛЯ ВИДЕО ===
function initVideoModal() {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <video controls style="width: 100%; height: auto;">
                Ваш браузер не поддерживает видео
            </video>
            <div class="video-info">
                <h3 class="video-title"></h3>
                <p class="video-description"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalVideo = modal.querySelector('video');

    // Открытие модального окна при клике на видео
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const video = this.querySelector('video');
            const source = video.querySelector('source');
            if (!source) {
                console.error('Source не найден');
                return;
            }
            
            const videoSrc = source.src;
            const workContent = this.closest('.work-item').querySelector('.work-content');
            const title = workContent.querySelector('h3').textContent;
            const description = workContent.querySelector('p').textContent;
            
            console.log('Открываем модальное окно для:', videoSrc);
            openModal(videoSrc, title, description);
        });
    });

    function openModal(videoSrc, title, description) {
        console.log('openModal вызван с:', videoSrc);
        
        // Останавливаем все фоновые видео
        document.querySelectorAll('.video-container video').forEach(vid => {
            vid.pause();
        });
        
        // Полностью пересоздаем source элемент
        modalVideo.innerHTML = '';
        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';
        modalVideo.appendChild(source);
        
        modal.querySelector('.video-title').textContent = title;
        modal.querySelector('.video-description').textContent = description;
        
        // Показываем модальное окно
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Загружаем видео
        modalVideo.load();
        
        console.log('Видео загружено, пытаемся воспроизвести...');
        
        // Пытаемся воспроизвести
        modalVideo.play().then(() => {
            console.log('Видео успешно воспроизводится');
        }).catch(e => {
            console.log('Автовоспроизведение заблокировано, но видео готово:', e);
            // Показываем сообщение пользователю
            const playButton = document.createElement('div');
            playButton.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 107, 0, 0.9);
                color: white;
                padding: 15px 30px;
                border-radius: 30px;
                cursor: pointer;
                font-weight: bold;
                z-index: 10003;
            `;
            playButton.textContent = '▶ Нажмите для воспроизведения';
            playButton.onclick = () => {
                modalVideo.play();
                playButton.remove();
            };
            modal.querySelector('.modal-content').appendChild(playButton);
        });
    }

    function closeModal() {
        console.log('Закрываем модальное окно');
        const modal = document.querySelector('.video-modal');
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
        document.body.style.overflow = 'auto';
        
        // Перезапускаем фоновые видео
        setTimeout(() => {
            document.querySelectorAll('.video-container video').forEach(vid => {
                vid.play().catch(e => {
                    // Игнорируем ошибки автовоспроизведения
                });
            });
        }, 500);
    }

    // Закрытие модального окна
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('Модальное окно инициализировано');
}
