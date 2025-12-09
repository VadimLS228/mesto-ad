function showInputError(input, errorElement, errorText, validationSettings) {
    errorElement.textContent = errorText;
    errorElement.classList.add(validationSettings.errorClass);
    input.classList.add(validationSettings.inputErrorClass)
}

function hideInputError(input, errorElement, validationSettings) {
    errorElement.textContent = "";
    errorElement.classList.remove(validationSettings.errorClass);
    input.classList.remove(validationSettings.inputErrorClass)
}

function checkInputValidity(input, validationSettings) {
    const isValid = input.validity.valid;
    const errorElement = document.querySelector(`#${input.id}-error`);

    if (isValid) {
        hideInputError(input, errorElement, validationSettings);
    } else {
        const errorText = input.validity.patternMismatch ? input.dataset.errorMessage : input.validationMessage;
        showInputError(input, errorElement, errorText, validationSettings);
    }

    return isValid;
}

function hasInvalidInput(inputs, validationSettings) {
    return inputs.some(input => !checkInputValidity(input, validationSettings));
}

function disableSubmitButton(button, validationSettings) {
    button.setAttribute('disabled', true);
    button.classList.add(validationSettings.inactiveButtonClass);
}

function enableSubmitButton(button, validationSettings) {
    button.removeAttribute('disabled');
    button.classList.remove(validationSettings.inactiveButtonClass);
}

function toggleButtonState(form, validationSettings) {
    const inputs = Array.from(form.querySelectorAll(validationSettings.inputSelector));
    const submitButton = form.querySelector(validationSettings.submitButtonSelector);

    if (hasInvalidInput(inputs, validationSettings)) disableSubmitButton(submitButton, validationSettings);
    else enableSubmitButton(submitButton, validationSettings);
}

function setEventListeners(form, validationSettings) {
    form.querySelectorAll(validationSettings.inputSelector).forEach(input => {
        input.addEventListener("input", () => toggleButtonState(form, validationSettings));
    })
}

export function clearValidation(form, validationSettings) {
    form.querySelectorAll(validationSettings.inputSelector).forEach(input => {
        const errorElement = document.querySelector(`#${input.id}-error`);
        hideInputError(input, errorElement, validationSettings);
    })
    disableSubmitButton(form.querySelector(validationSettings.submitButtonSelector), validationSettings);
}

export function enableValidation(validationSettings) {
    document.querySelectorAll(validationSettings.formSelector).forEach(form => {
        setEventListeners(form, validationSettings);
    })
}
