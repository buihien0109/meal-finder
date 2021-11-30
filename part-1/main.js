// Truy cập vào các thành phần
const search = document.getElementById("search");
const submit = document.getElementById("submit");
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
