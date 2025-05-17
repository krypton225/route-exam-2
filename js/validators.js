"use strict";

const Validator = (function () {
    function name(value) {
        const REG_EXP = /^[A-Za-z\s]+$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

    function email(value) {
        const REG_EXP = /^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9-]+(\.[A-Za-z]{2,})+$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

    function phone(value) {
        const REG_EXP = /^01\d{9}$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

    function age(value) {
        const REG_EXP = /^(?:1[01][0-9]|120|[1-9][0-9]?)$/;

        const isValid = REG_EXP.test(value);

        return isValid;
    }

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
