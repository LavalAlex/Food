const { Router } = require("express");
const routerMongo = Router();
const Diet = require("../models/dietMDB");
const Recipe = require("../models/recipeMDB");
const { getRecipesAll, getRecipeId } = require("../utils/utilsMongo");

routerMongo.get("/types", async (req, res) => {
  try {
    // const apiDiet = await getDiet();
    const apiDiet = await Diet.find({})
    res.status(200).send(apiDiet);
  } catch (error) {
    console.log("Error on types diet", error);
    res.status(501).send({ msg: "Error on get type diet" });
  }
});

routerMongo.get("/recipes", async (req, res) => {
  try {
    const name = req.query.name;
    const apiInfo = await getRecipesAll();
    if (name) {
      let recipeName = await apiInfo.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      recipeName[0]
        ? res.status(200).send(recipeName)
        : res.status(404).send({ msg: "Not found recipe with that name" });
    } else {
      res.status(200).send(apiInfo);
    }
  } catch (e) {
    console.log("Error on recipe db", e);
    res.status(501).send({ msg: "Error on recipe db" });
  }
});

routerMongo.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const recipeID = await getRecipeId(id);
    recipeID.length
      ? res.status(200).send(recipeID)
      : res.status(404).send({ msg: "Not found recipe with id" });
  } catch (e) {
    console.log("Error on recepes id", e);
    res.status(404).send({ msg: "Not found" });
  }
});

routerMongo.post("/recipes", async (req, res) => {
  try {
    const {
      name,
      summary,
      img,
      score,
      health,
      diet,
      createInDB,
      step,
      dishTypes,
    } = req.body;
    let createRecipe = new Recipe({
      name,
      summary,
      img,
      score,
      health,
      createInDB,
      step,
      dishTypes,
      diet,
    });
    createRecipe.save();
    res.status(200).send({ msg: "Successfully" });
  } catch (e) {
    console.log("Error on created the recipe", e);
    res.send("Error on created the recipe");
  }
});
module.exports = routerMongo;
