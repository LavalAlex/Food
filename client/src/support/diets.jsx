export  function DocumentName(name){
    var dietsName={
        'gluten free':'Sin Gluten',
        'vegetarian':'Vegetariano',
        'dairy free':'Lacteo Vegetariana',
        'lacto ovo vegetarian':'Ovo Vegetariano',
        'vegan':'Vegano',
        'pescatarian':'Pescetarian',
        'paleolithic':'Paleo',
        'primal':'Primitivo',
        'fodmap friendly':'Ketogenica',
        'whole 30':'Entero30'
    }
    return(
        dietsName[name]
    )
}

