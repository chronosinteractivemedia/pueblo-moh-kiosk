import React from "react"
import style from "../Attractions/Attractions.module.scss"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const options = [
  'All', 'Walkable', 'Lorem', 'Lorem 2'
];
const defaultOption = options[0];

function SearchBar (keywords, isWalkable) {

  return (
    <div className={style.searchBar_wrapper}>
      <div className={style.searchBar_inner}>
        <h2>Attraction Type</h2>
        <Dropdown 
          className={style.searchBar_dropdown} 
          controlClassName={style.searchBar_dropdown_control}
          placeholderClassName={style.searchBar_dropdown_placeholder}
          arrowClosed={<span className={style.searchBar_dropdown_arrow_close} />}
          arrowOpen={<span className={style.searchBar_dropdown_arrow_open} />}
          options={options} value={defaultOption} 
          placeholder="Select an option" />
          <input type="checkbox" />
          <div className={style.searchBar_walkicon}/>
          <h2>Walkable</h2>
      </div>
    </div>
  )
}

export default SearchBar