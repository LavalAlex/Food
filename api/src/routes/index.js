const { Router } = require("express");
const { getAllRecipe } = require("./getInfo");
const { getIDRecipe } = require("./getId");
const router = Router();
const { apiKey } = process.env;
const axios = require("axios");
const { Diet, Recipe } = require("../db");

// require('../connections');
const { DietMDB } = require("../models/dietMDB");

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  const recipesAll = await getAllRecipe();
  if (name) {
    let recipeName = await recipesAll.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    recipeName[0]
      ? res.status(200).send(recipeName)
      : res.status(404).send("No existe una receta con ese nombre, Sorry");
  } else {
    res.status(200).send(recipesAll);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recipeID = await getIDRecipe(id);
    if (id) {
      recipeID.length
        ? res.status(200).send(recipeID)
        : res.status(404).send("No existe receta con ese id...");
    } else {
      res.status(200).send(recipeAll);
    }
  } catch (e) {
    console.log("Error en el id de receta", e);
    res.status(404).send("No existe receta con ese id...");
  }
});

router.get('/types', async (req, res) => {
    const apiRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&number=100&apiKey=${apiKey}`);
    const diet = apiRecipe.data.results.map(e => e.diets);
    let dietEach =['vegetarian', 'vegan', 'gluten free'];
    diet.map(e =>{
        for (var i = 0;i < e.length; i++ ) {
            dietEach.push(e[i]);
        }
    });
    dietEach.forEach(e => {
        Diet.findOrCreate({
            where: { name: e}
        })
    });
    const allDiet = await Diet.findAll();
    res.send(allDiet)
})


router.post("/recipe", async (req, res) => {
  const {
    name,
    summary,
    img,
    score,
    health,
    diets,
    createInDB,
    step,
    dishTypes,
  } = req.body;

  let createRecipe = await Recipe.create({
    name,
    summary,
    img,
    score,
    health,
    createInDB,
    step,
    dishTypes,
  });

  let dietDB = await Diet.findAll({
    where: { name: diets },
  });
  createRecipe.addDiet(dietDB);
  res.send("Receta creada con exitos");
});
module.exports = router;
