"use strict";

const Search = (function () {
    function init() {
        const searchNameInput = document.getElementById("search-by-name");
        const searchFirstLetterInput = document.getElementById("search-first-letter");

        searchNameInput.addEventListener("input", searchNameInputHandler);
        searchFirstLetterInput.addEventListener("input", searchFirstLetterInputHandler);

        function search(textValue) {
            const inputValue = textValue.toLowerCase().trim();
            const allMeals = document.querySelectorAll("#row-data > div");

            let isMatch = false;

            allMeals.forEach(item => {
                let itemText = item.textContent || item.innerText;

                if (itemText.toLowerCase().indexOf(inputValue) > -1) {
                    item.style.display = ``;
                    isMatch = true;
                } else {
                    item.style.display = `none`;
                    isMatch = false;
                }
            });
        }

        function searchNameInputHandler(event) {
            search(event.target.value);
        }

        function searchFirstLetterInputHandler(event) {
            search(event.target.value);
        }
    }

    return {
        init,
    };
})();

export default Search;
