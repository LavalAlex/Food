const initialState = {
    recipes : [],
    allRecipes: [],//Aca me hago un backup del historial/state
    diets:[],
    details:[]
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_RECIPE':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };
        
        case 'FILTER_RECIPE_DIET':
            const allRecipies = state.allRecipes;
            var statusFiltered = allRecipies.filter(e =>{
                    if(e.createInDB){
                        for(var i = 0; i < e.diet.length;i++){
                            if(e.diet[i].name === action.payload) return e
                        }
                }else if(e.diet.includes(action.payload)) return e})
            return {
                ...state,
                recipes: statusFiltered
            };  
        
        case 'GET_RECIPE_NAME':
            return{
                ...state,
                recipes: action.payload
            };

        case 'FILTER_RECIPE_ADS':
            const allRecipes = state.allRecipes;
            if(action.payload === "asc"){
                allRecipes.sort((a,b) => {
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                })
            }else if(action.payload === "desc"){
                allRecipes.sort((a,b) => {
                    if(a.name < b.name) return 1;
                    if(a.name > b.name) return -1;
                    return 0;
                })

            }else {
                allRecipes.sort((a,b) => {
                    if(a.score < b.score) return 1;
                    if(a.score > b.score) return -1;
                    return 0;
                })
            }

            return{
                ...state,
                recipes: allRecipes
            }

        case 'GET_RECIPE_ID':
            return{
                ...state,
                details: action.payload
            };

        case 'GET_DIET_TYPE':
            return{
                ...state,
                diets: action.payload
            }
            
        case 'POST_RECIPE':
            return {
                ...state
            }

        case 'GET_RECIPE_ID_ALL':
            const recipeAll = state.recipes
            const recipeAllID = recipeAll.filter( e => e.id === parseInt(action.payload))
            return{ 
                ...state,
                details: recipeAllID
            }
            
        default: return state;
    }
}
export default rootReducer;