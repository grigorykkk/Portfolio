// Валидация форм

// Правила валидации для различных типов полей
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[а-яА-ЯёЁa-zA-Z\s]+$/,
        message: 'Имя должно содержать только буквы и пробелы (2-50 символов)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Введите корректный email адрес'
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 1000,
        message: 'Сообщение должно содержать от 10 до 1000 символов'
    },
    phone: {
        required: false,
        pattern: /^[\+]?[0-9\s\-\(\)]+$/,
        message: 'Введите корректный номер телефона'
    }
};

// Инициализация валидации форм при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeFormValidation();
});

function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        setupFormValidation(form);
    });
}

function setupFormValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    // Добавляем обработчики для валидации в реальном времени
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isValid = validateForm(this);
        
        if (isValid) {
            handleFormSubmission(this);
        }
    });
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const rules = validationRules[fieldName];
    
    if (!rules) {
        return true; // Нет правил для этого поля
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Проверка обязательности поля
    if (rules.required && !fieldValue) {
        isValid = false;
        errorMessage = 'Это поле обязательно для заполнения';
    }
    
    // Проверка минимальной длины
    if (isValid && rules.minLength && fieldValue.length < rules.minLength) {
        isValid = false;
        errorMessage = `Минимальная длина: ${rules.minLength} символов`;
    }
    
    // Проверка максимальной длины
    if (isValid && rules.maxLength && fieldValue.length > rules.maxLength) {
        isValid = false;
        errorMessage = `Максимальная длина: ${rules.maxLength} символов`;
    }
    
    // Проверка по регулярному выражению
    if (isValid && rules.pattern && !rules.pattern.test(fieldValue)) {
        isValid = false;
        errorMessage = rules.message;
    }
    
    if (isValid) {
        clearFieldError(field);
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
        const isFieldValid = validateField(input);
        if (!isFieldValid) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function showFieldError(field, message) {
    // Удаляем предыдущие ошибки
    clearFieldError(field);
    
    // Добавляем класс ошибки к полю
    field.classList.add('field-error');
    
    // Создаем элемент с сообщением об ошибке
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ff6b6b;
        font-size: 0.9rem;
        margin-top: 5px;
        padding: 5px 10px;
        border: 1px dashed #ff6b6b;
        background-color: rgba(255, 107, 107, 0.1);
        border-radius: 3px;
    `;
    
    // Вставляем сообщение об ошибке после поля
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
    // Анимация появления ошибки
    errorElement.style.opacity = '0';
    errorElement.style.transform = 'translateY(-10px)';
    
    requestAnimationFrame(() => {
        errorElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        errorElement.style.opacity = '1';
        errorElement.style.transform = 'translateY(0)';
    });
}

function clearFieldError(field) {
    field.classList.remove('field-error');
    
    const errorMessage = field.parentNode.querySelector('.field-error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('.form-submit');
    const originalButtonText = submitButton.textContent;
    
    // Показываем состояние загрузки
    submitButton.textContent = '[Отправка...]';
    submitButton.disabled = true;
    
    // Анимация кнопки
    submitButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        submitButton.style.transform = 'scale(1)';
    }, 150);
    
    // Имитация отправки данных
    setTimeout(() => {
        // Успешная отправка
        showSuccessMessage(form);
        
        // Восстанавливаем кнопку
        submitButton.textContent = '[Отправлено!]';
        
        // Очищаем форму через некоторое время
        setTimeout(() => {
            form.reset();
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Убираем сообщение об успехе
            const successMessage = form.querySelector('.success-message');
            if (successMessage) {
                successMessage.remove();
            }
        }, 3000);
        
    }, 2000);
}

function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background-color: rgba(0, 255, 0, 0.1);
            border: 2px dashed var(--terminal-border);
            color: var(--terminal-text);
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            border-radius: 5px;
        ">
            <strong>✓ Сообщение успешно отправлено!</strong><br>
            Спасибо за обращение. Я свяжусь с вами в ближайшее время.
        </div>
    `;
    
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Анимация появления
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateY(-20px)';
    
    requestAnimationFrame(() => {
        successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    });
}

// Дополнительные функции валидации

// Валидация email с проверкой домена
function validateEmailDomain(email) {
    const allowedDomains = ['gmail.com', 'yandex.ru', 'mail.ru', 'edu.ru', 'outlook.com'];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}

// Валидация номера телефона в российском формате
function validateRussianPhone(phone) {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const phonePattern = /^(\+7|8)?[0-9]{10}$/;
    return phonePattern.test(cleanPhone);
}

// Проверка на спам в сообщении
function checkForSpam(message) {
    const spamWords = ['спам', 'реклама', 'кредит', 'займ'];
    const lowerMessage = message.toLowerCase();
    
    return spamWords.some(word => lowerMessage.includes(word));
}

// Кастомная валидация для специальных случаев
function addCustomValidation(fieldName, validator) {
    if (typeof validator === 'function') {
        validationRules[fieldName] = validator;
    }
}

// Функция для добавления нового правила валидации
function addValidationRule(fieldName, rule) {
    validationRules[fieldName] = { ...validationRules[fieldName], ...rule };
}

// Экспорт функций для использования в других модулях
window.formValidation = {
    validateField,
    validateForm,
    addCustomValidation,
    addValidationRule,
    validateEmailDomain,
    validateRussianPhone,
    checkForSpam
};
