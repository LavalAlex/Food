import axios from "axios";

//Aca estoy obteniendo las recetas
export function getRecipe() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/mongo/recipes");
      return dispatch({
        type: "GET_RECIPE",
        payload: json.data,
      });
    } catch (e) {
      console.log("Error al llamar api getAll", e);
    }
  };
}

export function getRecipeAllID(payload) {
  return {
    type: "GET_RECIPE_ID_ALL",
    payload,
  };
}

export function getRecipeName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/mongo/recipes?name=" + name);
      return dispatch({
        type: "GET_RECIPE_NAME",
        payload: json.data,
      });
    } catch (e) {
      console.log("Error en la api-DB: ", e);
      alert("Error no existe receta con ese name");
    }
  };
}

export function getRecipeID(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/mongo/recipes/${id}`);
      return dispatch({
        type: "GET_RECIPE_ID",
        payload: json.data,
      });
    } catch (e) {
      console.log("Error en la id de la receta", e);
    }
  };
}

export function getDietType() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/mongo/types");
      return dispatch({
        type: "GET_DIET_TYPE",
        payload: json.data,
      });
    } catch (error) {
      console.log("Error en api front", error);
    }
  }}

export function filterRecipeBYDiet(payload) {
  return {
    type: "FILTER_RECIPE_DIET",
    payload,
  };
}

export function filterRecipeADS(payload) {
  return {
    type: "FILTER_RECIPE_ADS",
    payload,
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const data = await axios.post("http://localhost:3001/mongo/recipes", payload);
    return data;
  };
}