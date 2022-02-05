export function characters(diets, dishTypes){
    var diet = diets.map((e, i) => {
        if(i < diets.length -1){
         return e.name?  e.name + " - ": e + " - " 
        }else{
         return e.name?  e.name : e  
        }})
    var dishType = dishTypes.map((e, i) => {
        if(i < dishTypes.length -1){
         return e.name?  e.name + " * ": e + " * " 
        }else{
         return e.name?  e.name : e  
        }})
    return {diet, dishType}
}