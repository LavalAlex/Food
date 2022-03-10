import React from "react";
import "../../styles/Paginado.css";

export default function Paginado({ recipesPerPage, allRecipies, paginado, m }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipies / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="conteiner">
      <ul className="pagination">
        {pageNumbers.map((n) => {
          if (n === m)
            return (
              <a className={"pgNum" + 1} onClick={() => paginado(n)} key={n}>
                {n}
              </a>
            );
          else {
            return (
              <a className={"pgNum"} onClick={() => paginado(n)} key={n}>
                {n}
              </a>
            );
          }
        })}
      </ul>
    </div>
  );
}
