// Управление модальными окнами

// Глобальные переменные для модальных окон
let currentModal = null;
let modalStack = [];

// Функция для открытия модального окна
function openModal(modalId, content = null) {
    const modal = document.getElementById(modalId);
    
    if (modal) {
        // Добавляем текущее модальное окно в стек
        if (currentModal) {
            modalStack.push(currentModal);
            closeModal(currentModal.id, false);
        }
        
        currentModal = modal;
        modal.style.display = 'block';
        
        // Анимация появления
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        requestAnimationFrame(() => {
            modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        });
        
        // Убеждаемся, что содержимое модального окна непрозрачное
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '1';
            modalContent.style.backgroundColor = 'var(--white-primary)';
        }
        
        // Блокируем прокрутку страницы
        document.body.style.overflow = 'hidden';
        
        // Фокус на модальном окне для доступности
        modal.focus();
        
        // Если передано содержимое, вставляем его
        if (content && typeof content === 'string') {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.innerHTML = content;
            }
        }
    }
}

// Функция для закрытия модального окна
function closeModal(modalId = null, restoreStack = true) {
    let modal;
    
    if (modalId) {
        modal = document.getElementById(modalId);
    } else if (currentModal) {
        modal = currentModal;
    }
    
    if (modal) {
        // Анимация исчезновения
        modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.transition = '';
            
            // Восстанавливаем предыдущее модальное окно из стека
            if (restoreStack && modalStack.length > 0) {
                const previousModalId = modalStack.pop();
                const previousModal = document.getElementById(previousModalId);
                if (previousModal) {
                    openModal(previousModalId);
                }
            } else if (modalStack.length === 0) {
                currentModal = null;
                // Разблокируем прокрутку страницы
                document.body.style.overflow = '';
            }
        }, 300);
    }
}

// Функция для открытия модального окна проекта
function openProjectModal(projectId) {
    const projectData = getProjectData(projectId);
    
    if (projectData) {
        const content = generateProjectModalContent(projectData);
        openModal('projectModal', content);
    }
}

// Функция для получения данных проекта
function getProjectData(projectId) {
    // Данные проектов (можно вынести в отдельный файл)
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
            github: '#',
            images: ['project1-1.jpg', 'project1-2.jpg']
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
            github: '#',
            images: ['project2-1.jpg', 'project2-2.jpg']
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
            github: '#',
            images: ['project3-1.jpg', 'project3-2.jpg']
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
            github: '#',
            images: ['personal-1.jpg']
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
            github: '#',
            images: ['todo-1.jpg']
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
            github: '#',
            images: ['store-1.jpg']
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
            github: '#',
            images: ['portfolio-1.jpg']
        }
    };
    
    return projectsData[projectId] || null;
}

// Функция для генерации содержимого модального окна проекта
function generateProjectModalContent(project) {
    return `
        <div class="project-modal-content">
            <div class="row">
                <div class="col-md-6">
                    <div class="project-images">
                        ${project.images ? project.images.map(img => 
                            `<img src="../images/${img}" alt="${project.title}" class="img-fluid mb-2 project-image">`
                        ).join('') : '<div class="placeholder-image">Изображение проекта</div>'}
                    </div>
                </div>
                <div class="col-md-6">
                    <h3 class="project-modal-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    
            <div class="project-technologies mb-3">
                <h5>Технологии:</h5>
                <div class="tech-badges">
                    ${project.technologies.map(tech => {
                        const techClass = tech.toLowerCase().replace(/\s+/g, '').replace('#', '');
                        return `<span class="badge ${techClass} me-2 mb-2">${tech}</span>`;
                    }).join('')}
                </div>
            </div>
                    
                    <div class="project-features mb-3">
                        <h5>Основные функции:</h5>
                        <ul class="feature-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-links">
                        <a href="${project.demo}" class="btn btn-outline-light me-2" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Демо
                        </a>
                        <a href="${project.github}" class="btn btn-outline-light" target="_blank">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Функция для закрытия модального окна проекта
function closeProjectModal() {
    closeModal('projectModal');
}

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', function() {
    // Закрытие модального окна при клике вне его
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
    
    // Закрытие модального окна по клавише Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && currentModal) {
            closeModal();
        }
    });
    
    // Обработка кликов по кнопкам закрытия
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-close')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }
    });
});

// Функция для создания кастомного модального окна
function createCustomModal(options) {
    const {
        id,
        title,
        content,
        size = 'medium',
        closable = true,
        backdrop = true
    } = options;
    
    const modalHtml = `
        <div id="${id}" class="modal ${backdrop ? '' : 'no-backdrop'}" tabindex="-1">
            <div class="modal-content modal-${size}">
                ${closable ? '<span class="modal-close">&times;</span>' : ''}
                <div class="modal-header">
                    <h4 class="modal-title">${title}</h4>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    // Добавляем модальное окно в DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    return document.getElementById(id);
}

// Функция для удаления модального окна
function destroyModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
        
        // Если это было текущее модальное окно, очищаем ссылку
        if (currentModal && currentModal.id === modalId) {
            currentModal = null;
            document.body.style.overflow = '';
        }
    }
}
