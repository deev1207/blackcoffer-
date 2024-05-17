import "./Box.css";
// import React, { useState } from 'react';

export default function Box({ onFiltersChange, filter_name, data }) {

  function handleSelectChange(e) {
    onFiltersChange(e.target.value)
  }
  const filter_arr = data.map((item) => {

    return (
      <option value={item} key={item}>
        {item}
      </option>
    );


  });
  return (
    <>
      <div className="dropdown-container">
        <select className="box dropdown" onChange={handleSelectChange}>
          <option value="" selected>
            {filter_name}
          </option>
          {filter_arr}
        </select>
      </div>
    </>
  )
}
