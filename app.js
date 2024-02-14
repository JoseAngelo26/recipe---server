const express = require('express');
const app = express();
app.use(express.json());

let recipes = [];

app.get('/', (req, res) => {
    res.send('Server is running!');
});

// pang kuha lahat ng recipe
app.get('/recipes', (req, res) => {
    // pang filter
    const mealType = req.query.mealType;
    
    let filteredRecipes = recipes;
    if (mealType) {
        filteredRecipes = recipes.filter(recipe => recipe.mealType === mealType);
    }
    
    res.send(filteredRecipes);
});

// pang search ng id
app.get('/recipes/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (!recipe) {
        return res.status(404).send({ message: 'Recipe not found' });
    }
    res.send(recipe);
});

// pang add ng recipe
app.post('/recipes', (req, res) => {
    const recipe = req.body;
    recipe.id = recipes.length + 1;
    recipes.push(recipe);
    res.send(recipe);
});

// pang update ng recipe
app.put('/recipes/:id', (req, res) => {
    const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id));
    if (recipeIndex === -1) {
        return res.status(404).send({ message: 'Recipe not found' });
    }
    recipes[recipeIndex] = req.body;
    res.send(recipes[recipeIndex]);
});

// pang delete
app.delete('/recipes/:id', (req, res) => {
    const recipeIndex = recipes.findIndex(r => r.id === parseInt(req.params.id));
    if (recipeIndex === -1) {
        return res.status(404).send({ message: 'Recipe not found' });
    }
    recipes.splice(recipeIndex, 1);
    res.send({ message: 'Recipe deleted successfully' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => 
    console.log(`Listening to http://localhost:${port} ...`)
);
