document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetchRecipes(query);
    } else {
        alert('Please enter a search term.');
    }
});

async function fetchRecipes(query) {
    try {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=69738007&app_key=
36761f6b5dd17fd30afaadeb60517fa8`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to fetch recipes. Please try again later.');
    }
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-item';
        recipeItem.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>${recipe.label}</h3>
            <p>${recipe.source}</p>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;
        recipeList.appendChild(recipeItem);
    });
}
