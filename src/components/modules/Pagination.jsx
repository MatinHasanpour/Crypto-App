import React, { useState } from "react";
import style from "./pagination.module.css";

function Pagination({ page, setPage }) {
  const previousHandler = () => {
    if (page <= 1) return;
    setPage((page) => page - 1);
  };

  const NextHandler = () => {
    if (page >= 12) return;
    setPage((page) => page + 1);
  };

  return (
    <div className={style.pagination}>
      <button
        onClick={previousHandler}
        className={page === 1 ? style.disabled : null}
      >
        Previous
      </button>
      <p className={page === 1 ? style.selected : null}>1</p>
      <p className={page === 2 ? style.selected : null}>2</p>
      <span>...</span>
      {page > 2 && page < 11 && (
        <>
          <p className={style.selected}>{page}</p>
          <span>...</span>
        </>
      )}
      <p className={page === 11 ? style.selected : null}>11</p>
      <p className={page === 12 ? style.selected : null}>12</p>
      <button
        onClick={NextHandler}
        className={page === 12 ? style.disabled : null}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
