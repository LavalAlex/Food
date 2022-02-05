import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,useHistory } from "react-router-dom";
import { getDietType, postRecipe } from "../../actions";
import {DocumentName} from "../../support/diets";
import {validateRecipe, validateAdds} from "../../support/validate";
import "../../styles/Created.css"
import CardDetails from "../Card/CardDetails";
import RenderNavBar from "../common/BarNav";


export default function CreateRecipe (){
    const dispatch = useDispatch();
    const history = useHistory();
    const [dataForm, setForm]=useState({ step:'', dishTypes:''});
    const diets = useSelector(state => state.diets);
    const [errors, setErrors] = useState({});
    var flags= false
    const [input, setInput] = useState({
        name:'', 
        summary:'', 
        score:'', 
        health:'', 
        diets:[],
        step:[],
        dishTypes:[],
        img:''
    })

    useEffect(() => {
        dispatch(getDietType());
    },[dispatch])
    
    function handlerChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        setErrors(validateRecipe({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handlerForm(e){
        setForm({
            ...dataForm,
            [e.target.name] : e.target.value
        })
        setErrors(validateAdds({
            ...input,
            step: [...input.step,dataForm.step]
             }))
    }

    function handlerCheck(e){
        if(e.target.checked && e.target.defaultValue ){
           setInput({
               ...input,
               diets: [...input.diets,e.target.value]
           })
           setErrors(validateRecipe(({
            ...input,
            diets: [...input.diets,e.target.value]
        })));
        }else{
            var name =  e.target.defaultValue
            setInput({
                ...input,
                diets: input.diets.filter(e => e !==  name)
            })
            setErrors(validateRecipe({
                ...input,
                diets: input.diets.filter(e => e !==  name)
            }))
        }
    }

    function handleAddStep(e){
        if(e.target.id === "step"){
            if(dataForm.step === '' || dataForm.step === ' ' ){
                alert("Agregar un paso de la receta");
            }else{
                setInput({
                    ...input,
                    step: [...input.step,dataForm.step]
                     })
                setErrors(validateAdds({
                    ...input,
                    step: [...input.step,dataForm.step]
                     }))
            }
        }else{
            if(dataForm.dishTypes === "" || dataForm.dishTypes === " "){
                alert("Agregar un tipo de plato");
            }else{
                setInput({
                    ...input,
                    dishTypes: [...input.dishTypes,dataForm.dishTypes]
                })
                setErrors(validateAdds({
                    ...input,
                    dishTypes: [...input.dishTypes,dataForm.dishTypes]
                }))
            }}
            setForm({step:'',dishTypes:''})
    }

    function handleClear(e){
        var name = e.target.id
        if(e.target.name === "step"){
            setInput({
                ...input,
                step: input.step.filter(e => e !==  name)
            })
        }else{
            setInput({
                ...input,
                dishTypes: input.dishTypes.filter(e => e !==  name)
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        const err = validateRecipe(input)
        const errb = validateAdds(input)
        if(!err.flags || !errb.flags){
            alert("Hay campos por seleccionar");
        }else{
            dispatch(postRecipe(input));
            alert("Receta creada con exito");
            setInput({
                name:'', 
                summary:'', 
                score:'', 
                health:'', 
                diets:[],
                step:[],
                dishTypes:[],
                img:''
            });
            history.push('/home')
        };
    };

    function handlePreVisual(e){
        e.preventDefault();
        flags = true
        console.log('Entra')
    }

    return(
     
        <div className="frame-nav-bar">
        <div className="navBar">
           <RenderNavBar nav="1"/>
        </div>
        <div className="frame-createdRecipe">
            <div className="body-frame-input">
                    <div className="input-check">
                    <h3>Tipos de dietas</h3>
                    {diets?.map(e => {
                    return(
                        <div key={e.id}  >
                      <span> {DocumentName(e.name)}</span> 
                        <input 
                            type='checkbox' 
                            name={e.name} 
                            value={e.name} 
                            onChange={(e)=> handlerCheck(e)}/>
                        </div>
                    )
                    })}
                    </div>
                {errors.diets && (
                    <p>{errors.diets}</p>
                )}      
            <div className="frame-input">
            <div >
             {errors.name && (
                    <p>{errors.name}</p>
                )}
                <input 
                  type='text'
                  placeholder='Nombre de la receta'
                  name='name'
                  value={input.name}
                  onChange={handlerChange}
                />
            </div>
            <div>
                {errors.summary && (
                      <p>{errors.summary}</p>
                )}
                <textarea 
                  type='text'
                  cols='23'
                  row='40'
                  name='summary'
                  placeholder='Resumen del plato'
                  value={input.summary}
                  onChange={handlerChange}>
                </textarea>
               
            </div>
            <div>
                {errors.score && (
                      <p>{errors.score}</p>
                 )}
                <input 
                  type='number'
                  placeholder='Puntuacion'
                  name='score'
                  value={input.score}
                  onChange={handlerChange}
                />
               
            </div>
            <div>
                {errors.health && (
                      <p>{errors.health}</p>
                )}
                <input 
                   type='number'
                   placeholder='Nivel de comida saludable'
                   name='health'
                   value= {input.health}
                   onChange={handlerChange}
                />
             
            </div>
            <div>
                 <input 
                    type='text'
                    placeholder='Imagen'
                    name='img'
                    value= {input.img}
                    onChange={handlerChange}
                />
            </div>
            {errors.step && (
                      <p>{errors.step}</p>
            )}
            <div className="step-input">
            <div>
                <input 
                    type='text'
                    placeholder='Paso a paso'
                    name='step'
                    value={dataForm.step}
                    onChange={handlerForm}
                />
               
            </div>
            <div className="btn-add">
                <button type='submit' id='step' onClick={e => handleAddStep(e)}>Add</button>
            </div>         
            <div>            
            </div>
            </div>
            <div >
                {input.step?.map(e => {
                    return(
                        <div className="toast">
                        <div className="close">
                        <button type='submit' id={e} name='step' onClick={e => handleClear(e)}></button>
                        </div>
                        <div className="message">
                          {e}
                        </div>
                        </div>
                    )
                } )}
            </div>
            {errors.dishTypes && (
                      <p>{errors.dishTypes}</p>
                  )}
            <div className="dish-input">
            <div >            
                 <input 
                    type='text'
                    placeholder='Tipo de plato'
                    name='dishTypes'
                    value={dataForm.dishTypes}
                    onChange={handlerForm}
                />
            </div>
            <div className="btn-add">
                <button type='submit' id='dishTypes' onClick={e => handleAddStep(e)}>Add</button>
            </div>
            </div>
            <div>
                {input.dishTypes?.map(e => {
                    return(
                        <div className="toast">
                        <div className="close">
                        <button type='submit' id={e} name='dishTypes' onClick={e => handleClear(e)}></button>
                        </div>
                        <div className="message">
                          {e}
                        </div>
                        </div>
                    )
                } )}
            </div>
                <button className="btn-created" type='submit' onClick={e => handleSubmit(e)}>Crear Receta</button>
                {/* <button className="btn-created" type='submit' onClick={e => handlePreVisual(e)}>Pre-Visual</button> */}
            
            </div>
            </div>
            <div className="frame-previsual">
            { !flags && (
                CardDetails(input)
            )}
            </div>
        </div>
        </div>
    )
}