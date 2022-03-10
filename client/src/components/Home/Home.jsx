import { React, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRecipeADS,
  filterRecipeBYDiet,
  getRecipe,
  getRecipeName,
  getDietType,
} from "../../actions";
import Card from "../Card/Card";
import Paginado from "./Paginado";
import { DocumentName } from "../../support/diets.jsx";
import "../../styles/Home.css";
import ButtonRender from "../common/Button.jsx";
import "../../styles/NavRadio.css";
import RenderNavBar from "../common/BarNav";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipies = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);
  const [input, setInput] = useState(""); //Estado local
  const [order, setOrder] = useState("");

  //Seteo de cantidad de recetas por pagina
  const [currentPage, setCurrentPage] = useState(1); //Pagina actual
  const [recipesPerPage, setRecipesPerPage] = useState(9); //Cantidad de recetas por pagina
  const indexOfLastRecipe = currentPage * recipesPerPage; //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0--9--18--
  const currentRecipes = allRecipies.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  useEffect(() => {
    dispatch(getRecipe());
    dispatch(getDietType());
  }, [dispatch]);

  var n = 0;
  //Setea la cantidad de paginas renderizadas
  const paginado = (pageNumber) => {
    n = pageNumber;
    setCurrentPage(pageNumber);
  };

  //Volver a cargar pagina
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipe());
    dispatch(getDietType());
  }

  //Funcion que filtra por dietas
  function handleFilter(e) {
    e.preventDefault();
    dispatch(filterRecipeBYDiet(e.target.value));
    setCurrentPage(1); //Con esto le digo que se ubique en la page 1
  }

  //Funcion que buscar receta por name
  function handleSearch(e) {
    e.preventDefault();
    if (!input) {
      alert("Debe colocar un nombre");
    } else {
      dispatch(getRecipeName(input));
    }
    setInput("");
  }

  //Function guarda el estado del imput
  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  //Funcion que ORDENA
  function handleOrder(e) {
    e.preventDefault();
    dispatch(filterRecipeADS(e.target.value));
    setCurrentPage(1); //Con esto le digo que se ubique en la page 1
    setOrder(e.target.value);
  }

  return (
    <div className="frame-home">
      <div className="hedear-filters-search">
        <RenderNavBar nav="2" />

        <div className="header-home">
          <div className="btn-filter-home">
            <div className="btn-asc">
              <button
                className="btn-filter"
                value="asc"
                onClick={(e) => handleOrder(e)}
              >
                A-Z
              </button>
            </div>
            <div className="btn-score">
              <button
                className="btn-filter"
                value="score"
                onClick={(e) => handleOrder(e)}
              >
                Puntuacion
              </button>
            </div>
            <div className="btn-desc">
              <button
                className="btn-filter"
                value="desc"
                onClick={(e) => handleOrder(e)}
              >
                Z-A
              </button>
            </div>
          </div>
          <div className="header-search-btn">
            <input
              type="text"
              placeholder="Buscar por nombre de receta"
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <button
              type="submit"
              onClick={(e) => handleSearch(e)}
              className="btn-search"
            >
              Buscar
            </button>
          </div>
          <select onChange={(e) => handleFilter(e)} className="selection-home">
            <option>Tipo de Dietas</option>
            {diets?.map((e) => {
              return <option value={e.name}>{DocumentName(e.name)}</option>;
            })}
          </select>
        </div>
        <div className="conteiner-paginado">
          <Paginado
            recipesPerPage={recipesPerPage}
            allRecipies={allRecipies.length}
            paginado={paginado}
            m={currentPage}
          />
        </div>
      </div>
      <div className="home-body-card">
        {currentRecipes[0] ? (
          currentRecipes.map((e) => {
            if (e) {
              return (
                <Fragment>
                  <div className="home-card" key={e.id}>
                    <Card
                      name={e.name}
                      img={e.img}
                      diets={e.diet}
                      dishTypes={e.dishTypes}
                      id={e.id}
                      score={e.score}
                    />
                  </div>
                </Fragment>
              );
            }
          })
        ) : (
          <div className="loading">
            <img src="https://i.gifer.com/VAyR.gif" alt="Not Found GIF" />
            <span> Loading</span>
          </div>
        )}
      </div>
    </div>
  );
}
