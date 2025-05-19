const Categories = (function () {
    const categoriesRow = document.getElementById("categories-row");
    const categoriesContent = document.getElementById("categories-content-row");
    const rowCategoriesData = document.getElementById("row-categories-data");
    const categoryLoader = document.getElementById("categories-loader");
    const categoriesContentRowLoader = document.getElementById("categories-content-row-loader");
    const rowCategoriesDataLoader = document.getElementById("row-categories-data-loader");

    async function init() {
        const arr = await getData();

        categoryLoader.classList.add("d-none");
        categoriesContentRowLoader.classList.remove("d-none");

        categoriesRow.innerHTML = showCategoriesInDOM(arr);

        categoriesRow.addEventListener("click", async (e) => {
            const card = e.target.closest(".c-card-meal");
            if (!card) return;

            const currentName = card.dataset.name;

            await showDetails(currentName);
        });

        categoriesContent.addEventListener("click", async (e) => {
            const card = e.target.closest(".c-card-meal");
            if (!card) return;

            const currentID = card.dataset.id;

            await showMealDetails(currentID);
        });
    }

    async function getData() {
        try {
            categoryLoader.classList.remove("d-none");

            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
            const data = await response.json();

            return data.categories;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function showCategoriesInDOM(arr = []) {
        let html = ``;

        categoriesRow.classList.remove("d-none");
        categoriesContent.classList.add("d-none");
        categoriesContentRowLoader.classList.add("d-none");

        for (const element of arr) {
            html += `
                <div class="col-sm-3">
                    <div class="c-card-meal" data-id="${element.idCategory}" data-name="${element.strCategory}">
                        <div class="c-card-meal__img">
                            <img src="${element.strCategoryThumb}" alt="${element.strCategoryDescription}" />
                        </div>

                        <div class="c-card-meal__overlay py-4 flex-column justify-content-center">
                            <span>${element.strCategory}</span>

                            <p class="h-100">
                                ${element.strCategoryDescription}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }

        return html;
    }

    async function showDetails(currentName) {
        if (!currentName) {
            throw new Error("The name of must be provided!");
        }

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${currentName}`);

            if (!response.ok) throw new Error("Bad response");

            const data = await response.json();

            data.meals.forEach(element => {
                categoriesContent.innerHTML += `
                    <div class="col-sm-3">
                        <div class="c-card-meal" data-id="${element.idMeal}" data-name="${element.strMeal}">
                            <div class="c-card-meal__img">
                                <img src="${element.strMealThumb}" alt="${element.strMeal}" />
                            </div>

                            <div class="c-card-meal__overlay">
                                <span>${element.strMeal}</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            categoriesRow.classList.add("d-none");
            categoriesContent.classList.remove("d-none");
        } catch (error) {
            console.error("Failed to get the details of meal!", error);
        }
    }

    async function showMealDetails(mealID) {
        if (!mealID) {
            throw new Error("The ID of meal must be provided!");
        }

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);

            if (!response.ok) throw new Error("Bad response");

            const data = await response.json();
            const oneMeal = data.meals[0];

            rowCategoriesData.innerHTML = createHTMLForMealDetails(oneMeal);
            categoriesRow.classList.add("d-none");
            categoriesContent.classList.add("d-none");
            rowCategoriesData.classList.remove("d-none");
            rowCategoriesDataLoader.classList.add("d-none");
        } catch (error) {
            console.error("Failed to get the details of meal!", error);
        }
    }

    function createHTMLForMealDetails(oneMeal = {}) {
        return `
            <div class="col-md-4">
                <img class="w-100 rounded-3" src="${oneMeal.strMealThumb}" alt="${oneMeal.strMeal}" />
                <h3>${oneMeal.strMeal}</h3>
            </div>

            <div class="col-md-8">
                <h3>Instructions</h3>
                
                <p class="my-3">${oneMeal.strInstructions}</p>

                <h3><span class="fw-bolder">Area:</span> ${oneMeal.strArea}</h3>
                
                <h3><span class="fw-bolder">Category:</span> ${oneMeal.strCategory}</h3>

                <h3>Recipes:</h3>
                
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${showRecipes(oneMeal)}
                </ul>

                <h3>Tags:</h3>

                <ul class="list-unstyled d-flex gap-3 flex-wrap">
                    ${oneMeal.strTags
                ? oneMeal.strTags
                    .split(",")
                    .map(tag => `<li class="alert alert-danger p-1">${tag}</li>`)
                    .join("")
                : "<li class='text-muted'>No tags</li>"
            }
                </ul>

                <a target="_blank" href="${oneMeal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${oneMeal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        `;
    }

    function showRecipes(oneMeal = {}) {
        let recipes = "";

        for (let i = 1; i <= 20; i++) {
            const ingredient = oneMeal[`strIngredient${i}`];
            const measure = oneMeal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                recipes += `
                    <li class="alert alert-info m-2 p-1">
                        ${measure} ${ingredient}
                    </li>
                `;
            }
        }

        return recipes;
    }

    return {
        init,
    };
})();

export default Categories;
