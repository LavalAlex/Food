import React from "react";
import { characters } from "../../support/characters";


export default function CardDetails(prop){
    var {diet, dishType} = characters(prop.diets, prop.dishTypes)
   
    return(
        <div key={prop.key} className="frame-details" >
        <div className="header-card-details">
        <div className="img-details">
            <img src={prop.img} alt="not found" /> 
        </div>
        <div className="name-sumarry">
            <h2>{prop.name}</h2>
            <span>{prop.summary?.replace(/<[^>]*>?/gm,'')}</span>

        </div>
        </div>
        <div className="conteiner-types-scores-step">
        <div className="conteiner-types">
            <div className="type-diet">
                <h5>Dieta: </h5>
                <p>{diet}</p>
            </div>
            <div className="score">
                <h5>Score: </h5> 
                <p>{prop.score}</p>
            </div>
           
        </div>
        <div className="conteiner-step">
            <h2>Paso a Paso: </h2> 
            <span>{prop.step}</span>
        </div>
        <div className="conteiner-scores">
            <div className="type-dish">
                <h5>Tipo de plato: </h5> 
                <p>{dishType}</p>
            </div>
            <div className="health">
                <h5>Nivel saludable: </h5> 
                <p>{prop.health}</p>
            </div>
        </div>
      
        </div>  
        
        </div>
    )
}