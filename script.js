// Инициализация звездного фона
function createStars() {
    const container = document.getElementById('star-background');
    const starsCount = Math.floor(window.innerWidth * window.innerHeight / 1000);
    
    // Очистка предыдущих звезд
    container.innerHTML = '';
    
    // Создание новых звезд
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Случайные параметры звезды
        const size = 0.5 + Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = 0.3 + Math.random() * 0.7;
        const duration = 2 + Math.random() * 8;
        const delay = Math.random() * 5;
        
        // Применение стилей
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.setProperty('--opacity', opacity);
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;
        
        // Добавление звезды на фон
        container.appendChild(star);
    }
}

// Анимация элементов при прокрутке
function setupScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Плавная прокрутка для навигации
function setupSmoothScrolling() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Обновление URL без перезагрузки
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Адаптация к изменению размера окна
function handleResize() {
    createStars();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Установка текущего года в футере
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Создание звездного фона
    createStars();
    
    // Настройка анимаций
    setupScrollAnimations();
    
    // Настройка плавной прокрутки
    setupSmoothScrolling();
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
});

// Загрузка дополнительных данных (пример)
async function loadHistoricalData() {
    try {
        // Здесь может быть загрузка данных с API
        // const response = await fetch('https://api.example.com/history');
        // const data = await response.json();
        // Обработка данных...
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}