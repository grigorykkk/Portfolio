document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterProjects(filter);
        });
    });
});

function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const tech = card.getAttribute('data-tech');
        
        if (filter === 'all' || tech === filter) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.style.transition = 'all 0.3s ease';
}


function resetFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons[0].classList.add('active'); // Активируем кнопку "Все"
    
    filterProjects('all');
}

function getActiveFilter() {
    const activeButton = document.querySelector('.filter-btn.active');
    return activeButton ? activeButton.getAttribute('data-filter') : 'all';
}

function countProjectsByFilter(filter) {
    const projectCards = document.querySelectorAll('.project-card');
    let count = 0;
    
    projectCards.forEach(card => {
        const tech = card.getAttribute('data-tech');
        if (filter === 'all' || tech === filter) {
            count++;
        }
    });
    
    return count;
}

function updateProjectCounter() {
    const activeFilter = getActiveFilter();
    const count = countProjectsByFilter(activeFilter);
    
    let counter = document.getElementById('project-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'project-counter';
        counter.className = 'project-counter';
        counter.style.cssText = `
            text-align: center;
            margin: 20px 0;
            color: var(--text-primary);
            font-weight: bold;
        `;
        
        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.parentNode.insertBefore(counter, projectsGrid);
    }
    
    counter.textContent = `Найдено проектов: ${count}`;
}

document.addEventListener('DOMContentLoaded', function() {
    updateProjectCounter();
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', updateProjectCounter);
    });
});

function searchProjects(query) {
    const projectCards = document.querySelectorAll('.project-card');
    const searchQuery = query.toLowerCase();
    
    projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const tech = card.querySelector('.project-tech').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || tech.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function addSearchField() {
    const filters = document.querySelector('.filters');
    if (filters && !document.getElementById('project-search')) {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'project-search';
        searchInput.placeholder = 'Поиск проектов...';
        searchInput.className = 'form-input';
        searchInput.style.cssText = `
            margin-left: 20px;
            width: 200px;
            display: inline-block;
        `;
        
        searchInput.addEventListener('input', function() {
            const query = this.value;
            if (query.trim() === '') {
                const activeFilter = getActiveFilter();
                filterProjects(activeFilter);
            } else {
                searchProjects(query);
            }
        });
        
        filters.appendChild(searchInput);
    }
}

