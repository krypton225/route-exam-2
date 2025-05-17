"use strict";

const Loader = (function () {
    const loader = document.getElementById("loader");

    /**
     * Displays the loader by removing the "d-none" class from its element.
     */
    function run() {
        loader.classList.remove("d-none");
    }

    /**
     * Hides the loader by adding the "d-none" class to its element.
     */
    function hide() {
        loader.classList.add("d-none");
    }

    return {
        run,
        hide,
    };
})();

export default Loader;
