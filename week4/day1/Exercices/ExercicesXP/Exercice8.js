// Part2 :

javascript
function makeJuice(size) {
    function addIngredients(ing1, ing2, ing3) {
        document.body.innerHTML += `<p>The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}</p>`;
    }
    addIngredients('apple', 'orange', 'carrot');
}

makeJuice('large');
// Part2 :

javascript
function makeJuice(size) {
    let ingredients = [];
    
    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }
    
    function displayJuice() {
        document.body.innerHTML += `<p>The client wants a ${size} juice, containing ${ingredients.join(', ')}</p>`;
    }
    
    addIngredients('apple', 'orange', 'carrot');
    addIngredients('ginger', 'spinach', 'lemon');
    displayJuice();
}

makeJuice('large');