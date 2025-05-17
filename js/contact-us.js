"user strict";

import Validator from "./validators.js";

const ContactUs = (function () {
    /**
     * Initializes the contact form by setting up event listeners for input validation
     * and form submission. Attaches input event handlers to various form fields 
     * including name, email, phone, age, password, and re-password inputs to validate
     * their respective values. Additionally, sets up a click event handler for the
     * submit button to handle form submission.
     */
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

    /**
     * Validates a given input value and updates the corresponding input field's alert.
     * @param {string} alertInputID - The ID of the input field's alert element.
     * @param {string} type - The type of the input field being validated. Can be one of
     * "name", "email", "phone", "age", or "password".
     * @param {string} value - The value of the input field being validated.
     */
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

    /**
     * Validates all input fields and enables the submit button if all inputs are valid.
     * Disable the submit button if any of the input fields are invalid.
     */
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

    /**
     * Handles input event on the name input field. Validates the input value and updates
     * the corresponding input field's alert element. Also, validates all input fields and
     * enables the submit button if all inputs are valid.
     * @param {Event} event - The input event object.
     */
    function nameInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-name`, `name`, currentValue);

        validateAllInputs();
    }

    /**
     * Handles input event on the email input field. Validates the input value and updates
     * the corresponding input field's alert element. Also, validates all input fields and
     * enables the submit button if all inputs are valid.
     * @param {Event} event - The input event object.
     */
    function emailInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-email`, `email`, currentValue);

        validateAllInputs();
    }

    /**
     * Handles input event on the phone input field. Validates the input value and updates
     * the corresponding input field's alert element. Also, validates all input fields and
     * enables the submit button if all inputs are valid.
     * @param {Event} event - The input event object.
     */
    function phoneInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-phone`, `phone`, currentValue);

        validateAllInputs();
    }

    /**
     * Handles input event on the age input field. Validates the input value and updates
     * the corresponding input field's alert element. Also, validates all input fields and
     * enables the submit button if all inputs are valid.
     * @param {Event} event - The input event object.
     */
    function ageInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-age`, `age`, currentValue);

        validateAllInputs();
    }

    /**
     * Handles input event on the password input field. Validates the input value and
     * updates the corresponding input field's alert element. Also, validates all input
     * fields and enables the submit button if all inputs are valid.
     * @param {Event} event - The input event object.
     */
    function passwordInputHandler(event) {
        const currentValue = event.target.value;

        validateInput(`contact-alert-password`, `password`, currentValue);

        validateAllInputs();
    }

    /**
     * Handles input event on the re-password input field. Compares the re-password
     * input value with the password input value to ensure they match. Updates the
     * corresponding input field's alert element based on the match result. Also,
     * validates all input fields and enables the submit button if all inputs are valid.
     * @param {Event} event - The input event object.
     */
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

    /**
     * Handles the click event on the contact form's submit button. Validates all
     * input fields and enables the submit button if all inputs are valid.
     * @param {Event} event - The click event object.
     */
    function contactSubmitHandler(event) {
        validateAllInputs();
    }

    return {
        init,
    };
})();

export default ContactUs;
