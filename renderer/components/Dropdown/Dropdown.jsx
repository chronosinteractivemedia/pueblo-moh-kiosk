import React from 'react';
import styles from './Dropdown.module.scss';
import ReactDropdown from "react-dropdown";

export default function Dropdown({items,  onChange, placeholder, className, value}) {
  let options = items;
  function handleChange(selected){
    onChange(selected.value);
  }
  return <div className={className}>
    <ReactDropdown
      options={options}
      value={value}
      onChange={handleChange}
      className={styles.dropdown}
      controlClassName={styles.controls}
      arrowClassName={styles.arrow}
      arrowClosed={<span className={styles.arrowClosed} />}
      arrowOpen={<span className={styles.arrowOpen} />}
      placeholder={placeholder} />
  </div>
}
