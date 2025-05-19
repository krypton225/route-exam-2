"use strict";

import Area from "./area.js";
import Categories from "./categories.js";

const SideNavbar = (function () {
    /**
     * Initializes the side navbar.
     *
     * @function init
     * @memberof SideNavbar
     * @private
     * @return {void}
     */
    function init() {
        const header = document.getElementById("l-header");
        const hamburgerIcon = document.getElementById("l-navbar-hamburger-icon");
        const xIcon = document.getElementById("l-navbar-x-icon");

        const navbarStart = document.getElementById("navbar-start");

        navbarStart.addEventListener("click", navbarStartHandler);

        hamburgerIcon.addEventListener("click", hamburgerIconHandler);
        xIcon.addEventListener("click", xIconHandler);

        /**
         * Toggles the visibility of the header by adding or removing the "is-show" class.
         *
         * @function toggleHeader
         * @memberof SideNavbar
         * @private
         * @return {void}
         */
        function toggleHeader() {
            header.classList.toggle("is-show");
        }

        /**
         * Toggles the visibility of the hamburger and x icons by adding or removing the "d-none" class.
         *
         * @function toggleIcons
         * @memberof SideNavbar
         * @private
         * @return {void}
         */
        function toggleIcons() {
            hamburgerIcon.classList.toggle("d-none");
            xIcon.classList.toggle("d-none");
        }

        /**
         * Handles the hamburger icon click event. Toggles the visibility of the header and the icons
         * and animates the navbar links.
         *
         * @function hamburgerIconHandler
         * @memberof SideNavbar
         * @private
         * @param {Event} event - The click event object.
         * @return {void}
         */
        function hamburgerIconHandler(event) {
            toggleHeader();
            toggleIcons();

            animateNavbarLinks();
        }

        /**
         * Handles the x icon click event. Toggles the visibility of the header and the icons
         * and disables the animation of the navbar links.
         *
         * @function xIconHandler
         * @memberof SideNavbar
         * @private
         * @param {Event} event - The click event object.
         * @return {void}
         */
        function xIconHandler(event) {
            toggleHeader();
            toggleIcons();

            disableAnimationNavbarLinks();
        }

        /**
         * Animates the navbar links by adding the "is-show" class to them and sets the transition delay
         * using the data-delay-time attribute.
         *
         * @function animateNavbarLinks
         * @memberof SideNavbar
         * @private
         * @return {void}
         */
        function animateNavbarLinks() {
            const allSections = navbarStart.querySelectorAll(".l-navbar__start__item");

            allSections.forEach(section => {
                section.classList.add("is-show");
                section.style.transitionDelay = section.dataset.delayTime;
            });
        }

        /**
         * Disables the animation of the navbar links by removing the "is-show" class and keeping the transition delay
         * defined in the data-delay-time attribute.
         *
         * @function disableAnimationNavbarLinks
         * @memberof SideNavbar
         * @private
         * @return {void}
         */
        function disableAnimationNavbarLinks() {
            const allSections = navbarStart.querySelectorAll(".l-navbar__start__item");

            allSections.forEach(section => {
                section.classList.remove("is-show");
                section.style.transitionDelay = section.dataset.delayTime;
            });
        }

        /**
         * Handles the click event on the navbar start links. It hides all sections but the one
         * related to the clicked link and toggles the header and icons.
         *
         * @function navbarStartHandler
         * @memberof SideNavbar
         * @private
         * @param {MouseEvent} event - The MouseEvent object.
         * @return {void}
         */
        function navbarStartHandler(event) {
            const sectionName = event.target.dataset.section;

            const main = document.getElementById("l-main");

            const allSections = main.querySelectorAll("section");

            allSections.forEach(section => {
                section.classList.add("d-none");

                if (section.classList.contains(`categories`)) {
                    Categories.init();
                } else if (section.classList.contains(`area`)) {
                    Area.init();
                }
            });

            document.getElementById(sectionName).classList.remove("d-none");

            toggleHeader();
            toggleIcons();

            disableAnimationNavbarLinks();
        }
    }

    return {
        init,
    };
})();

export default SideNavbar;
