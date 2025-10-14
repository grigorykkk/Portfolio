// Основной JavaScript файл для портфолио

// Данные проектов для модальных окон
const projectsData = {
    'project1': {
        title: 'Проект 1 - Личный сайт',
        description: 'Полнофункциональный личный сайт-портфолио с адаптивным дизайном и современным интерфейсом.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
        features: [
            'Адаптивный дизайн',
            'Интерактивные элементы',
            'Оптимизация для мобильных устройств',
            'SEO оптимизация'
        ],
        demo: '#',
        github: '#'
    },
    'project2': {
        title: 'Проект 2 - Todo приложение',
        description: 'Интерактивное приложение для управления задачами с возможностью добавления, редактирования и удаления.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
        features: [
            'Добавление и удаление задач',
            'Отметка выполненных задач',
            'Сохранение в локальном хранилище',
            'Фильтрация задач'
        ],
        demo: '#',
        github: '#'
    },
    'project3': {
        title: 'Проект 3 - Интернет-магазин',
        description: 'Полнофункциональный интернет-магазин с корзиной покупок и системой заказов.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        features: [
            'Каталог товаров',
            'Корзина покупок',
            'Система регистрации',
            'Обработка заказов'
        ],
        demo: '#',
        github: '#'
    },
    'personal-website': {
        title: 'Личный сайт',
        description: 'Современный личный сайт-портфолио с терминальным дизайном и интерактивными элементами.',
        technologies: ['HTML', 'CSS'],
        features: [
            'Терминальный дизайн',
            'Адаптивная верстка',
            'Анимации и эффекты',
            'Оптимизация производительности'
        ],
        demo: '#',
        github: '#'
    },
    'todo-app': {
        title: 'Todo-приложение',
        description: 'Интерактивное приложение для управления задачами с современным интерфейсом.',
        technologies: ['JavaScript'],
        features: [
            'CRUD операции',
            'Локальное хранение данных',
            'Валидация форм',
            'Responsive дизайн'
        ],
        demo: '#',
        github: '#'
    },
    'online-store': {
        title: 'Интернет-магазин',
        description: 'Полнофункциональный интернет-магазин с административной панелью.',
        technologies: ['React'],
        features: [
            'SPA архитектура',
            'Управление состоянием',
            'API интеграция',
            'Пагинация и фильтрация'
        ],
        demo: '#',
        github: '#'
    },
    'portfolio': {
        title: 'Портфолио',
        description: 'Современное портфолио с использованием Bootstrap и кастомных стилей.',
        technologies: ['Bootstrap'],
        features: [
            'Bootstrap компоненты',
            'Модальные окна',
            'Carousel галерея',
            'Контактные формы'
        ],
        demo: '#',
        github: '#'
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Анимация прогресс-баров
    animateProgressBars();
    
    // Инициализация навигации
    initializeNavigation();
    
    // Инициализация форм
    initializeForms();
});

// Анимация прогресс-баров при прокрутке
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .course-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Инициализация навигации
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Добавляем эффект нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Инициализация форм
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Добавляем анимацию отправки
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '[Отправка...]';
            submitBtn.disabled = true;
            
            // Имитация отправки
            setTimeout(() => {
                submitBtn.textContent = '[Отправлено!]';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1000);
        });
    });
}

// Функция openProjectModal определена в modal.js

// Функция для закрытия модального окна
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Закрытие модального окна по клавише Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Эффект печатающейся машинки для заголовков
function typewriterEffect(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Инициализация эффекта печатающейся машинки для заголовков
function initializeTypewriterEffect() {
    const titles = document.querySelectorAll('h1, h2');
    
    titles.forEach(title => {
        if (title.textContent.includes('(')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                        entry.target.classList.add('typed');
                        const originalText = entry.target.textContent;
                        typewriterEffect(entry.target, originalText, 50);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(title);
        }
    });
}

// Инициализация всех эффектов
document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriterEffect();
});
