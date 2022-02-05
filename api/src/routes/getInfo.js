const {Diet, Recipe} = require('../db');
const axios = require('axios');
const {apiKey} = process.env;
const {RecipeMDB} = require('../models/recipeMDB')

const getApiInfo = async () => {
    const apiRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&number=100&apiKey=${apiKey}`)
    const apiInfo = await apiRecipe.data.results.map ( e => {
        var diets
        if(e.vegetarian){
            diets = e.diets;
            diets.push('vegetarian')
        } 
        return {
            id: e.id,
            name: e.title,
            img: e.image,
            summary: e.summary,
            score: e.spoonacularScore,
            health: e.healthScore,
            step: e.analyzedInstructions[0]?.steps.map(e=>e.step),
            dishTypes: e.dishTypes,
            diets:e.vegetarian === true? diets: e.diets,
        };
    });
    return apiInfo;
};

const getdataDB = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        }
    })
}

const getAllRecipe = async () => {
    const apiInfo = await getApiInfo();
    const dataDB = await getdataDB();
    const apiTotal = await apiInfo.concat(dataDB);
    return apiTotal
}

module.exports = {
    getAllRecipe
  }
