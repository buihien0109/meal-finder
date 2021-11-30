// Truy cập vào các thành phần
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

// =========== API ===========
// API lấy danh sách meal
function getMealsAPI(term) {
    return axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
}

// API lấy chi tiết meal theo id
function getMealByIdAPI(mealID) {
    return axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
}

// API lấy ngẫu nhiên meal
function getRandomMealAPI() {
    return axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
}

// =========== Hàm xử lý ===========
// Lấy danh sách meal
async function getMeals(term) {
    try {
        const res = await getMealsAPI(term);
        const meals = res.data.meals;

        renderMealList(meals, term);
    } catch (error) {
        console.log(error);
    }
}

// Lấy chi tiết meal theo id
async function getMealById(mealID) {
    try {
        const res = await getMealByIdAPI(mealID);
        const meal = res.data.meals[0];
        console.log(meal);
        renderMeal(meal);
    } catch (error) {
        console.log(error);
    }
}

// Lấy ngẫu nhiên meal
async function getRandomMeal() {
    try {
        const res = await getRandomMealAPI();
        const meal = res.data.meals[0];
        renderMeal(meal);
    } catch (error) {
        console.log(error);
    }
}

// Event listeners
submit.addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy dữ liệu trong ô input
    const term = search.value;

    if (term == "") {
        alert("Tiêu đề không được để trống");
        return;
    }

    getMeals(term);
    search.value = "";
});

random.addEventListener("click", function () {
    mealsEl.innerHTML = "";
    resultHeading.innerHTML = "";

    getRandomMeal();
});

// Hiển thị danh sách meal ra ngoài giao diện
function renderMealList(arr, term) {
    // Clear nội dung phần hiển thị meal list
    mealsEl.innerHTML = "";

    // Clear nội dung phần hiển thị meal detail
    single_mealEl.innerHTML = "";

    // Hiển thị từ khóa tìm kiếm
    resultHeading.innerHTML = `<h2>Kết quả tìm kiếm cho từ khóa '${term}':</h2>`;

    // Trường hợp không có tìm thấy kết quả
    if (!arr) {
        resultHeading.innerHTML = `<p>Không tìm thấy kết quả yêu cầu. Vui lòng thử lại !<p>`;
        return;
    }

    // Render kết quả
    for (let i = 0; i < arr.length; i++) {
        const m = arr[i];
        mealsEl.innerHTML += `
            <div class="meal" onclick="getMealById(${m.idMeal})">
                <img src="${m.strMealThumb}" alt="${m.strMeal}" />
                <div class="meal-info">
                    <h3>${m.strMeal}</h3>
                </div>
            </div>
        `;
    }
}

function renderMeal(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;
}
