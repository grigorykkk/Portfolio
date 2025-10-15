
let currentModal = null;
let modalStack = [];

function openModal(modalId, content = null) {
    const modal = document.getElementById(modalId);
    
    if (modal) {
        if (currentModal) {
            modalStack.push(currentModal);
            closeModal(currentModal.id, false);
        }
        
        currentModal = modal;
        modal.style.display = 'block';
        
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        requestAnimationFrame(() => {
            modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        });
        
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.opacity = '1';
            modalContent.style.backgroundColor = 'var(--white-primary)';
        }
        
        document.body.style.overflow = 'hidden';
        
        modal.focus();
        
        if (content && typeof content === 'string') {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.innerHTML = content;
            }
        }
    }
}

function closeModal(modalId = null, restoreStack = true) {
    let modal;
    
    if (modalId) {
        modal = document.getElementById(modalId);
    } else if (currentModal) {
        modal = currentModal;
    }
    
    if (modal) {
        modal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.transition = '';
            
            if (restoreStack && modalStack.length > 0) {
                const previousModalId = modalStack.pop();
                const previousModal = document.getElementById(previousModalId);
                if (previousModal) {
                    openModal(previousModalId);
                }
            } else if (modalStack.length === 0) {
                currentModal = null;
                document.body.style.overflow = '';
            }
        }, 300);
    }
}

function openProjectModal(projectId) {
    const projectData = getProjectData(projectId);
    
    if (projectData) {
        const content = generateProjectModalContent(projectData);
        openModal('projectModal', content);
    }
}

function getProjectData(projectId) {
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
            github: 'https://github.com/grigorykkk/FrontAndBack',
            images: ['photo_2025-10-15 13.05.04.jpeg', 'photo_2025-10-15 13.05.06.jpeg']
        },
        'project2': {
            title: 'Проект 2 - PKS',
            description: 'Репозиторий по выполнению задач на языке C# с примерами кода и решениями различных алгоритмических задач.',
            technologies: ['C#', '.NET', 'Visual Studio', 'Git'],
            features: [
                'Решение алгоритмических задач',
                'Примеры кода на C#',
                'Документированные решения',
                'Структурированная организация проектов'
            ],
            demo: '#',
            github: 'https://github.com/grigorykkk/PKS',
            images: ['photo_2025-10-15 13.05.04.jpeg', 'photo_2025-10-15 13.05.06.jpeg']
        },
        'project3': {
            title: 'Проект 3 - Front And Back 2.0',
            description: 'Обычный сайт на HTML, CSS и JavaScript с современным дизайном и интерактивными элементами.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            features: [
                'Адаптивный дизайн',
                'Интерактивные элементы',
                'Современный UI/UX',
                'Кроссбраузерная совместимость'
            ],
            demo: '#',
            github: 'https://github.com/grigorykkk/FrontAndBack2.0',
            images: ['photo_2025-10-15 13.05.06.jpeg', 'photo_2025-10-15 13.05.08.jpeg']
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
            github: 'https://github.com/grigorykkk/FrontAndBack2.0',
            images: ['personal-1.jpg']
        },
        'csharp-tasks': {
            title: 'PKS',
            description: 'Репозиторий по выполнению задач на языке C# с примерами кода и решениями различных алгоритмических задач.',
            technologies: ['C#', '.NET', 'Visual Studio', 'Git'],
            features: [
                'Решение алгоритмических задач',
                'Примеры кода на C#',
                'Документированные решения',
                'Структурированная организация проектов'
            ],
            demo: '#',
            github: 'https://github.com/grigorykkk/PKS',
            images: ['photo_2025-10-15 13.05.04.jpeg']
        },
        'frontend-website': {
            title: 'Front And Back 2.0',
            description: 'Обычный сайт на HTML, CSS и JavaScript с современным дизайном и интерактивными элементами.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            features: [
                'Адаптивный дизайн',
                'Интерактивные элементы',
                'Современный UI/UX',
                'Кроссбраузерная совместимость'
            ],
            demo: '#',
            github: 'https://github.com/grigorykkk/FrontAndBack2.0',
            images: ['photo_2025-10-15 13.05.08.jpeg']
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
            github: 'https://github.com/grigorykkk/Portfolio',
            images: ['photo_2025-10-15 13.05.08.jpeg']
        }
    };
    
    return projectsData[projectId] || null;
}

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

function closeProjectModal() {
    closeModal('projectModal');
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && currentModal) {
            closeModal();
        }
    });
    
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-close')) {
            const modal = event.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }
    });
});

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
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    return document.getElementById(id);
}

function destroyModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
        
        if (currentModal && currentModal.id === modalId) {
            currentModal = null;
            document.body.style.overflow = '';
        }
    }
}
