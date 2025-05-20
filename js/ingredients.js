"use strict";

window.getMealsOfArea = function (areaName) {
    Ingredients.getMealsOfArea(areaName);
};

window.renderDetailsOfOneMeal = function (mealID) {
    Ingredients.renderDetailsOfOneMeal(mealID);
};

const Ingredients = (function () {
    const ingredientsCountries = document.getElementById("ingredients-countries");
    const rowIngredientsMeals = document.getElementById("ingredients-content-row");
    const ingredientsLoader = document.getElementById("ingredients-loader");
    const rowIngredientsShowMeal = document.getElementById("row-ingredients-meals");
    const ingredientsContentRowLoader = document.getElementById("ingredients-content-row-loader");
    const rowIngredientsMealsLoader = document.getElementById("row-ingredients-meals-loader");

    async function init() {
        const allData = await fetchData();

        ingredientsLoader.classList.add("d-none");

        ingredientsCountries.innerHTML = renderInDOM(allData);
    }

    async function fetchData() {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);

            if (!response.ok) throw new Error("Bad response");

            const data = await response.json();

            return data.meals.slice(0, 20);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async function renderDetailsOfOneMeal(mealID) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);

            const data = await response.json();

            rowIngredientsMealsLoader.classList.add("d-none");

            rowIngredientsMeals.classList.remove("d-none");
            rowIngredientsShowMeal.classList.remove("d-none");
            ingredientsContentRowLoader.classList.add("d-none");

            rowIngredientsMeals.innerHTML = createHTMLForMealDetails(data.meals[0]);
        } catch (error) {
            console.error(error);
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

    function renderInDOM(arr = []) {
        let html = ``;

        for (const { idIngredient, strIngredient, strDescription } of arr) {
            html += `
            <div class="col-md-3">
                <div class="d-flex flex-column gap-2 text-center u-cursor-pointer" onclick="getMealsOfArea('${strIngredient}')">
                    <svg fill="#ffffff" viewBox="0 0 512 512" width="100" height="100" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M462.8 49.57a169.44 169.44 0 0 0-239.5 0C187.82 85 160.13 128 160.13 192v85.83l-40.62 40.59c-9.7 9.69-24 11.07-36.78 6a60.33 60.33 0 0 0-65 98.72C33 438.39 54.24 442.7 73.85 438.21c-4.5 19.6-.18 40.83 15.1 56.1a60.35 60.35 0 0 0 98.8-65c-5.09-12.73-3.72-27 6-36.75L234.36 352h85.89a187.87 187.87 0 0 0 61.89-10c-39.64-43.89-39.83-110.23 1.05-151.07 34.38-34.36 86.76-39.46 128.74-16.8 1.3-44.96-14.81-90.28-49.13-124.56z"></path></g></svg>

                    <span class="text-white">${strIngredient}</span>

                    <p>${strDescription.slice(0, 100)}...</p>
                </div>
            </div>`;
        }

        return html;
    }

    async function getMealsOfArea(strIngredient = ``) {
        try {
            ingredientsCountries.classList.add("d-none");
            rowIngredientsMealsLoader.classList.remove("d-none");

            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`);

            if (!response.ok) throw new Error("Bad response");

            const data = await response.json();

            rowIngredientsMealsLoader.classList.add("d-none");

            rowIngredientsMeals.innerHTML = renderAllInHTML(data.meals);

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function renderAllInHTML(meals = []) {
        let html = ``;

        for (const { idMeal, strMeal, strMealThumb } of meals) {
            html += `
                <div class="col-sm-3">
                    <div class="c-card-meal" data-id="${idMeal}" onclick="renderDetailsOfOneMeal('${idMeal}')">
                        <div class="c-card-meal__img">
                            <img src="${strMealThumb}" alt="${strMeal} meal" />
                        </div>
                        <div class="c-card-meal__overlay">${strMeal}</div>
                    </div>
                </div>
            `;
        }

        return html;
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
        getMealsOfArea,
        renderDetailsOfOneMeal,
    };
})();

export default Ingredients;
