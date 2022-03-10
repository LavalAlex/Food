import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, Link, useLocation } from "react-router-dom";
import CardDetails from "../Card/CardDetails";
import { getRecipeID, getRecipeAllID } from "../../actions";
import { validateDetailts } from "../../support/validate";
import "../../styles/Details.css"
import RenderNavBar from "../common/BarNav";
import "../../styles/NavRadio.css";


export default function Details (prop){
    const dispatch = useDispatch();
    var id = prop.match.params.id? prop.match.params.id:null;
    
    useEffect(() => {
        dispatch(getRecipeID(id))
    },[dispatch]);
    
    const idRecipe = useSelector((state) => state.details)
    const [input, setInput] = useState('')

    //Function guarda el estado del imput
    function handleChange(e){
        e.preventDefault();
        setInput(e.target.value); 
        
    }
   
    function handlerSearchID(e){
        e.preventDefault();
        // var error = validateDetailts(input)
        var errors = validateDetailts(input)
        if(errors.id){
            alert(errors.id)
            setInput('')
        }else{
            dispatch(getRecipeID(input))
        }
    }
    
    return(
        <div className="frame">
          
            <div className="header-details">
            {/* <NavLink to="/home"><button className="btn-back">Volver al Home</button></NavLink> */}
            <div className="nav-bar">

            <RenderNavBar nav="3"/>
            </div>
            <div className="search">
                <div className="conteiner-search">
                <div className="search-input">
                <input 
                    type= 'number'
                    placeholder='Buscar receta por id...'
                    name='name'
                    onChange={ e => handleChange(e)}
                />
                </div>
                <div className="search-butto">
                <button className="btn-search" type='submit' onClick={ e => handlerSearchID(e)}>Buscar</button>          
                </div>
                </div>
            </div>
                
                {/* <button className="btn-search" type='submit' onClick={ e => handlerSearchID(e)}>Buscar</button> */}
                {/* <Link to={`/details/${input}`} ><button >Buscar...</button></Link> */}
            </div>
            <div>
            {idRecipe.length>0? idRecipe.map(e => {
                if(e.id === parseInt(id) && !e.createInDB || e.id === parseInt(input) && !e.createInDB){
                    return(
                        <Fragment>
                            <div key={e.id}>
                            <CardDetails 
                                name={e.name} 
                                img={e.img} 
                                diets={e.diets} 
                                dishTypes={e.dishTypes}  
                                key={e.id}
                                score={e.score}
                                summary={e.summary}
                                id={id}
                                health={e.health}
                                step={e.step? e.step : "No hay pasos a seguir..."}    
                            />
                            </div>
                        </Fragment>
                )}else{ 
                    if(e.id === id && e.createInDB || e.id === input && e.createInDB ){
                        var diet = e.diets.map(d => d.name)
                    return(
                        <Fragment>
                            <div key={e.id}>
                            <CardDetails 
                                name={e.name} 
                                img={e.img} 
                                diets={diet} 
                                dishTypes={e.dishTypes}  
                                key={e.id}
                                score={e.score}
                                summary={e.summary}
                                id={id}
                                health={e.health}
                                step={e.step}    
                            />
                            </div> 
                        </Fragment>
                    )
                }}
                }): <div className="loading"><img src="https://i.gifer.com/VAyR.gif" alt="Not Found GIF"/><span> Loading</span></div>
            }
            </div>
        </div>

    )   
}
