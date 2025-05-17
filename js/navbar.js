const SideNavbar = (function () {
    /**
     * Initializes the side navbar by adding event listeners to the hamburger icon
     * and the X icon. When either of them is clicked, the side navbar will toggle
     * the "is-show" class on the header and the "d-none" class on the hamburger icon
     * and the X icon.
     */
    function init() {
        const header = document.getElementById("l-header");
        const hamburgerIcon = document.getElementById("l-navbar-hamburger-icon");
        const xIcon = document.getElementById("l-navbar-x-icon");

        hamburgerIcon.addEventListener("click", sideNavbarHandler);
        xIcon.addEventListener("click", sideNavbarHandler);

        function sideNavbarHandler(event) {
            header.classList.toggle("is-show");
            hamburgerIcon.classList.toggle("d-none");
            xIcon.classList.toggle("d-none");
        }
    }

    return {
        init,
    };
})();

export default SideNavbar;
