
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

document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
    
    initializeNavigation();
    
    initializeForms();
});

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

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
        
        link.addEventListener('mouseenter', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(-4px) scale(1.05)';
            }, index * 50);
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        link.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-lg), 0 0 0 4px rgba(255, 193, 7, 0.3)';
        });
        
        link.addEventListener('blur', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
                this.style.boxShadow = 'var(--shadow-sm)';
            }
        });
    });
    
    const navbar = document.querySelector('.navbar-nav');
    if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            navbar.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
            
            navLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.animation = 'fadeInUp 0.5s ease-out forwards';
                }, index * 100);
            });
        }, 200);
    }
}

function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '[Отправка...]';
            submitBtn.disabled = true;
            
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


function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

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

document.addEventListener('DOMContentLoaded', function() {
    initializeTypewriterEffect();
});
