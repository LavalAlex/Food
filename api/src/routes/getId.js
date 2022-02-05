const { default: axios } = require('axios');
const {Diet, Recipe} = require('../db');
const {apiKey} = process.env;

const getApiID = async (id) => {
    var apiInfoId=[];

    if(!id){
        return apiInfoId
    }else{
        try{
        const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
        var diets
        if(apiInfo.data.vegetarian){
            diets = apiInfo.data.diets;
            diets.push('vegetarian')
        } 
        apiInfoId = [{
            id: apiInfo.data.id,
            name: apiInfo.data.title,
            img: apiInfo.data.image,
            summary: apiInfo.data.summary,
            score: apiInfo.data.spoonacularScore,
            health: apiInfo.data.healthScore,
            diets: apiInfo.data.vegetarian === true? diets: apiInfo.data.diets,
            dishTypes: apiInfo.data.dishTypes,
            step: apiInfo.data.analyzedInstructions[0]?.steps.map(e=>e.step),
        }];
        return apiInfoId;
        }catch(e){
            console.log('Error en la api id',e)
            alert("Error no existe receta con ese id");
            return apiInfoId
        }
    }
};

const getdataDB = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            through:{
                attributes: [],
            },
        }
    })
}

const getIDRecipe = async (id) => {
    const apiInfo = await getApiID(id);  
    const dataDB = await getdataDB();
    const apiTotal = await apiInfo.concat(dataDB);
  
    return apiTotal
}

module.exports = {
    getIDRecipe 
  }