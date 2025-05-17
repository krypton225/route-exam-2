const Loader = (function () {
    const loader = document.getElementById("loader");

    function run() {
        loader.classList.remove("d-none");
    }

    function hide() {
        loader.classList.add("d-none");
    }

    return {
        run,
        hide,
    };
})();

export default Loader;
