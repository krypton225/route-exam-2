"user strict";

import Validator from "./validators.js";

const ContactUs = (function () {
    function init() {
        const nameInput = document.getElementById("contact-name");
        const emailInput = document.getElementById("contact-email");
        const phoneInput = document.getElementById("contact-phone");
        const ageInput = document.getElementById("contact-age");
        const passwordInput = document.getElementById("contact-password");
        const rePasswordInput = document.getElementById("re-password");
        const contactSubmit = document.getElementById("contact-submit");

        nameInput.addEventListener("input", nameInputHandler);
        emailInput.addEventListener("input", emailInputHandler);
        phoneInput.addEventListener("input", phoneInputHandler);
        ageInput.addEventListener("input", ageInputHandler);
        passwordInput.addEventListener("input", passwordInputHandler);
        rePasswordInput.addEventListener("input", rePasswordInputHandler);
        contactSubmit.addEventListener("click", contactSubmitHandler);
    }

    function validateInput(alertInputID, type, value) {
        const alertOfInput = document.getElementById(alertInputID);
        let isValidInput;

        if (type === `name`) {
            isValidInput = Validator.name(value);
        } else if (type === `email`) {
            isValidInput = Validator.email(value);
        } else if (type === `phone`) {
            isValidInput = Validator.phone(value);
        } else if (type === `age`) {
            isValidInput = Validator.age(value);
        } else if (type === `password`) {
            isValidInput = Validator.password(value);
        }

        if (value === ``) {
            alertOfInput.classList.add("d-none");

            return;
        }

        if (!isValidInput) {
            alertOfInput.classList.remove("d-none");
        } else {
            alertOfInput.classList.add("d-none");
        }
    }

    function validateAllInputs() {
        const nameInputValue = document.getElementById("contact-name").value;
        const emailInputValue = document.getElementById("contact-email").value;
        const phoneInputValue = document.getElementById("contact-phone").value;
        const ageInputValue = document.getElementById("contact-age").value;
        const passwordInputValue = document.getElementById("contact-password").value;
        const rePasswordInputValue = document.getElementById("re-password").value;

        const submitButton = document.getElementById("contact-submit");

        const isValidName = Validator.name(nameInputValue);
        const isValidEmail = Validator.email(emailInputValue);
        const isValidPhone = Validator.phone(phoneInputValue);
        const isValidAge = Validator.age(ageInputValue);
        const isValidPassword = Validator.password(passwordInputValue);

        const isValidRePassword = rePasswordInputValue === passwordInputValue;

        const areAllValid = isValidName && isValidEmail && isValidPhone && isValidAge && isValidPassword && isValidRePassword;

        if (areAllValid) {
            submitButton.removeAttribute("disabled");
        } else {
            submitButton.setAttribute("disabled", "true");
        }
    }

    function nameInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-name`, `name`, currentValue);

        validateAllInputs();
    }

    function emailInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-email`, `email`, currentValue);

        validateAllInputs();
    }

    function phoneInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-phone`, `phone`, currentValue);

        validateAllInputs();
    }

    function ageInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-age`, `age`, currentValue);

        validateAllInputs();
    }

    function passwordInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-password`, `password`, currentValue);

        validateAllInputs();
    }

    function rePasswordInputHandler(event) {
        const passwordInputValue = document.getElementById("contact-password").value;
        const currentValue = event.target.value;

        const alertRePassword = document.getElementById("contact-alert-re-password");

        if (currentValue === ``) {
            alertRePassword.classList.add("d-none");

            return;
        }

        if (passwordInputValue !== currentValue) {
            alertRePassword.classList.remove("d-none");
        } else {
            alertRePassword.classList.add("d-none");
        }

        validateAllInputs();
    }

    function contactSubmitHandler(event) {
        validateAllInputs();
    }

    return {
        init,
    };
})();

export default ContactUs;
