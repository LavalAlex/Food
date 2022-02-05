require("dotenv").config();
const axios = require("axios");
const { apiKey } = process.env;

//Models
const Diet = require("../models/dietMDB");
const Recipe = require("../models/recipeMDB");

//Diet
const getDiet = async () => {
  const apiRecipe = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&number=100&apiKey=${apiKey}`
  );
  const diet = apiRecipe.data.results.map((e) => e.diets);
  let dietEach = ["vegetarian", "vegan", "gluten free"];
  diet.map((e) => {
    for (var i = 0; i < e.length; i++) {
      dietEach.push(e[i]);
    }
  });
  var dietDB = dietEach.forEach((e) => {
    let dietDB = new Diet({
      name: e,
    });
    dietDB.save();
    return dietDB
  });
  return dietDB
};

//100 Recipes
const getRecipesAll = async () => {
  const apiRecipe = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&number=100&apiKey=${apiKey}`
  );
  var apiInfo = await apiRecipe.data.results.map((e) => {
    var diets;
    if (e.vegetarian) {
      diets = e.diets;
      diets.push("vegetarian");
    }
    var recipe = new Recipe({
      id: e.id,
      name: e.title,
      img: e.image,
      summary: e.summary,
      score: e.spoonacularScore,
      health: e.healthScore,
      step: e.analyzedInstructions[0]?.steps.map((e) => e.step),
      dishTypes: e.dishTypes,
      diet: e.vegetarian === true ? diets : e.diets,
    });
    return recipe;
  });
  const recipeDB = await Recipe.find({})
  apiInfo = apiInfo.concat(recipeDB)
  return apiInfo;
};

const getRecipeId = async (id) => {
  var apiInfoId = [];
  if (!id) {
    return apiInfoId;
  } else {
    const apiInfo = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    );
    var diets;
    if (apiInfo.data.vegetarian) {
      diets = apiInfo.data.diets;
      diets.push("vegetarian");
    }
    apiInfoId = [
      {
        id: apiInfo.data.id,
        name: apiInfo.data.title,
        img: apiInfo.data.image,
        summary: apiInfo.data.summary,
        score: apiInfo.data.spoonacularScore,
        health: apiInfo.data.healthScore,
        diets: apiInfo.data.vegetarian === true ? diets : apiInfo.data.diets,
        dishTypes: apiInfo.data.dishTypes,
        step: apiInfo.data.analyzedInstructions[0]?.steps.map((e) => e.step),
      },
    ];
    return apiInfoId;
  }
};

module.exports = {
  getRecipesAll,
  getDiet,
  getRecipeId,
};
