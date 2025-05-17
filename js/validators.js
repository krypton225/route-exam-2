"use strict";

const Validator = (function () {
    /**
     * Checks if the given value is a valid name.
     * @param {string} value The value to be checked.
     * @returns {boolean} True if the value is a valid name, false otherwise.
     */
    function name(value) {
        const REG_EXP = /^[A-Za-z\s]+$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

    /**
     * Checks if the given value is a valid email address.
     * @param {string} value The value to be checked.
     * @returns {boolean} True if the value is a valid email address, false otherwise.
     */
    function email(value) {
        const REG_EXP = /^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9-]+(\.[A-Za-z]{2,})+$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

    /**
     * Checks if the given value is a valid phone number.
     * @param {string} value The value to be checked.
     * @returns {boolean} True if the value is a valid phone number, false otherwise.
     */
    function phone(value) {
        const REG_EXP = /^01\d{9}$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

    /**
     * Checks if the given value is a valid age.
     * Valid age is a number between 1 and 120 inclusive.
     * @param {string} value The value to be checked.
     * @returns {boolean} True if the value is a valid age, false otherwise.
     */
    function age(value) {
        const REG_EXP = /^(?:1[01][0-9]|120|[1-9][0-9]?)$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

    /**
     * Checks if the given value is a valid password.
     * Valid password is a string which:
     * 1. Contains at least one letter.
     * 2. Contains at least one number.
     * 3. Has at least 8 characters.
     * @param {string} value The value to be checked.
     * @returns {boolean} True if the value is a valid password, false otherwise.
     */
    function password(value) {
        const REG_EXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

    return {
        name,
        email,
        phone,
        age,
        password,
    };

})();

export default Validator;
