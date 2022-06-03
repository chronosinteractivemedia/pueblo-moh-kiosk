import React from 'react';
import styles from './Dropdown.module.scss';
import ReactDropdown from "react-dropdown";

export default function Dropdown({items,  onChange, placeholder, className}) {
  let options = items;
  function handleChange(selected){
    onChange(selected.value);
  }
  return <div className={className}>
    <ReactDropdown
      options={options}
      onChange={handleChange}
      className={styles.dropdown}
      controlClassName={styles.controls}
      arrowClassName={styles.arrow}
      placeholder={placeholder} />
  </div>
}
