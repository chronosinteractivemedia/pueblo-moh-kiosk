import React, { useEffect, useState } from "react";
import style from "../Attractions/Attractions.module.scss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const options = [
  "All",
  "Arts & Culture",
  "Education",
  "Military Attractions",
  "Museums",
  "Outdoor Attractions & Parks",
  "Sports",
];

function SearchBar({ onSetWalkable, onSetType }) {
  const [walkable, setWalkable] = useState(false);
  const [type, setType] = useState("All");

  useEffect(() => {
    onSetWalkable(walkable);
  }, [walkable]);

  useEffect(() => {
    onSetType(type);
  }, [type]);

  return (
    <div className={style.searchBar_wrapper}>
      <div className={style.searchBar_inner}>
        <h2>Attraction Type</h2>
        <Dropdown
          className={style.searchBar_dropdown}
          controlClassName={style.searchBar_dropdown_control}
          placeholderClassName={style.searchBar_dropdown_placeholder}
          arrowClosed={
            <span className={style.searchBar_dropdown_arrow_close} />
          }
          arrowOpen={<span className={style.searchBar_dropdown_arrow_open} />}
          options={options}
          onChange={(val) => setType(val.value)}
          value={type}
          placeholder="Select an option"
        />
        <input type="checkbox" onChange={() => setWalkable(!walkable)} />
        <div className={style.searchBar_walkicon} />
        <h2>Walkable from Convention Center</h2>
      </div>
    </div>
  );
}

export default SearchBar;
