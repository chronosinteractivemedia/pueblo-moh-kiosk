import React from "react"
import style from "../Attractions/Attractions.module.scss"

function SearchBar (keywords, isWalkable) {
  return (
    <div className={style.searchBar_wrapper}>
      <div className={style.searchBar_inner}>
        <label>Attraction Type</label>
        <select>
          <option>All</option>
        </select>
        {/* <input type="checkbox">Walkable</input> */}
      </div>
    </div>
  )
}

export default SearchBar