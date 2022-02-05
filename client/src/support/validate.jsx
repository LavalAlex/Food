export function validateRecipe(input){
    let errors ={};
    let flags = true
    if(!input.diets.length){
        errors.diets = "Seleccione un tipo de dieta";
        flags = false
    }else if(!input.name && flags){
        errors.name = "Se requiere un Nombre";
        flags = false
    }else if(!input.summary && flags){
        errors.summary = "Coloque un breve resumen de la receta"
        flags = false
    }else if(!input.score  && flags){
        errors.score = "Falta la puntuacion a la receta, debe ser numerico";
        flags = false
    }else if(parseInt(input.score) > 100 || parseInt(input.score)< 0  && flags){
        errors.score = "La puntuacion debe estar entre 0 y 100"
        flags = false
    }else if(!input.health  && flags){
        errors.health = "Falta el nivel de salubridad de la dieta, debe ser numerico";
        flags = false
    }else if(parseInt(input.health) >100 || parseInt(input.health) < 0  && flags){
        errors.health = "El nivel de salubridad de comida debe estar entre 0 y 100";
        flags = false
    }
    errors.flags = flags
    return errors
}

export function validateAdds(input){
    let errors={};
    let flags = true;
    if(input.step.length === 0){
        errors.step = "Debe colocar los pasos de la receta";
        flags = false;
    }else if(input.dishTypes.length === 0){
        errors.dishTypes = "Falta colocar tipo de plato";
        flags = false;
    }
    errors.flags = flags;
    return errors;
}   

export function validateDetailts(input){
    let errors = {};
    if(parseInt(input)<0){
        errors.id = "Debe colocarse numeros positivos"
    }
    if(!input){
        errors.id = "Debe colocar un id, el cual debe ser positivo"
    }
    return errors
}