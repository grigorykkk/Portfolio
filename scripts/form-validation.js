
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
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
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
    
    if (rules.required && !fieldValue) {
        isValid = false;
        errorMessage = 'Это поле обязательно для заполнения';
    }
    
    if (isValid && rules.minLength && fieldValue.length < rules.minLength) {
        isValid = false;
        errorMessage = `Минимальная длина: ${rules.minLength} символов`;
    }
    
    if (isValid && rules.maxLength && fieldValue.length > rules.maxLength) {
        isValid = false;
        errorMessage = `Максимальная длина: ${rules.maxLength} символов`;
    }
    
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
    clearFieldError(field);
    
    field.classList.add('field-error');
    
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
    
    field.parentNode.insertBefore(errorElement, field.nextSibling);
    
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
    
    submitButton.textContent = '[Отправка...]';
    submitButton.disabled = true;
    
    submitButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        submitButton.style.transform = 'scale(1)';
    }, 150);
    
    setTimeout(() => {
        showSuccessMessage(form);
        
        submitButton.textContent = '[Отправлено!]';
        
        setTimeout(() => {
            form.reset();
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
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
            border: 2px dashed var(--border-color);
            color: var(--text-primary);
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
    
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateY(-20px)';
    
    requestAnimationFrame(() => {
        successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    });
}


function validateEmailDomain(email) {
    const allowedDomains = ['gmail.com', 'yandex.ru', 'mail.ru', 'edu.ru', 'outlook.com'];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}

function validateRussianPhone(phone) {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const phonePattern = /^(\+7|8)?[0-9]{10}$/;
    return phonePattern.test(cleanPhone);
}

function checkForSpam(message) {
    const spamWords = ['спам', 'реклама', 'кредит', 'займ'];
    const lowerMessage = message.toLowerCase();
    
    return spamWords.some(word => lowerMessage.includes(word));
}

function addCustomValidation(fieldName, validator) {
    if (typeof validator === 'function') {
        validationRules[fieldName] = validator;
    }
}

function addValidationRule(fieldName, rule) {
    validationRules[fieldName] = { ...validationRules[fieldName], ...rule };
}

window.formValidation = {
    validateField,
    validateForm,
    addCustomValidation,
    addValidationRule,
    validateEmailDomain,
    validateRussianPhone,
    checkForSpam
};
