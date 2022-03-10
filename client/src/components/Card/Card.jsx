import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Card.css"
import { characters } from "../../support/characters";

export default function Card({name, diets, id, img, dishTypes, score}){
    var {diet, dishType} = characters(diets, dishTypes);
    return(
        <div key={id} className="frame-card">
            <div className="header-card">
                <img id="img-card" src={img} alt="not found" width="200px" height="250px" /> 
            </div>
            <div className="frame-body">
            <div className="body-card">
                    <h4>{name}</h4>
                    <div>
                    <h5 id="diete-type">Tipo de Dieta: </h5>
                    </div>
                    <p id="p-diete"> {diet}</p>
                    <h5>Tipo de plato: </h5> 
                    <p>{dishType} </p>
            </div>
            <div className="btn-card">
                <div>
                    <h5>Puntuacion: {score}</h5> 
                </div>
                <div>
                    <Link to={`/details/${id}`} ><button className="btn">Details</button></Link>
                </div>
            </div>
            </div>
        </div>
    )
}