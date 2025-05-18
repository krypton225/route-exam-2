"use strict";

const Intro = (function () {
    const rowData = document.getElementById("row-data");
    const rowDetailsIntroData = document.getElementById("row-details-intro-data");
    const introLoader = document.getElementById("intro-loader");

    async function init() {
        const data = await getData();

        introLoader.classList.add("d-none");

        for (const meal of data) {
            rowData.innerHTML += createOneMeal(meal);
        }

        rowData.addEventListener("click", async (e) => {
            const card = e.target.closest(".c-card-meal");
            if (!card) return;

            const mealID = card.dataset.id;
            await showMealDetails(mealID);
        });
    }

    async function getData() {
        try {
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.meals;
        } catch (error) {
            console.error("Failed to fetch meals:", error);
            return [];
        }
    }

    function createOneMeal(meal = {}) {
        return `
            <div class="col-sm-3">
                <div class="c-card-meal" data-id="${meal.idMeal}">
                    <div class="c-card-meal__img">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal} meal" />
                    </div>
                    <div class="c-card-meal__overlay">${meal.strMeal}</div>
                </div>
            </div>
        `;
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

            rowDetailsIntroData.innerHTML = createHTMLForMealDetails(oneMeal);
            rowData.classList.add("d-none");
            rowDetailsIntroData.classList.remove("d-none");

            document.getElementById("intro-back-btn").addEventListener("click", showAgainMeals);
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

                <button class="btn btn-outline-danger text-capitalize d-block mt-3" id="intro-back-btn">
                    back
                </button>
            </div>
        `;
    }

    function showAgainMeals() {
        rowData.classList.remove("d-none");
        rowDetailsIntroData.classList.add("d-none");
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

export default Intro;