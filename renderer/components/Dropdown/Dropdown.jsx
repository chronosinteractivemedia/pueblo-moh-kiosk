import React from 'react';
import styles from './Dropdown.module.scss';
import ReactDropdown from "react-dropdown";

/**
 * Defensive Dropdown wrapper
 * - Normalizes items to either strings or { value, label }
 * - Filters out falsy / empty options
 * - Normalizes incoming `value` and emits a primitive (string|null) onChange
 */
export default function Dropdown({ items, onChange, placeholder, className, value }) {
  function normalizeOption(opt) {
    if (opt == null) return null;
    if (typeof opt === 'string') {
      const v = opt.trim();
      return v === '' ? null : v;
    }
    if (typeof opt === 'object') {
      const rawValue = opt.value ?? opt.label ?? '';
      const rawLabel = opt.label ?? opt.value ?? '';
      const v = rawValue == null ? '' : String(rawValue).trim();
      const l = rawLabel == null ? '' : String(rawLabel);
      return v === '' ? null : { value: v, label: l || v };
    }
    // unknown type -> ignore
    return null;
  }

  const options = Array.isArray(items)
    ? items.map(normalizeOption).filter(Boolean)
    : [];

  function handleChange(selected) {
    if (!selected) {
      return onChange && onChange(null);
    }
    if (typeof selected === 'object') {
      return onChange && onChange(selected.value ?? selected.label ?? null);
    }
    // selected may be a string
    return onChange && onChange(selected);
  }

  // Normalize controlled value to a primitive that matches option.value or option.label
  const normalizedValue = (() => {
    if (value == null) return null;
    if (typeof value === 'object') return value.value ?? value.label ?? null;
    return value;
  })();

  return (
    <div className={className}>
      <ReactDropdown
        options={options}
        value={normalizedValue}
        onChange={handleChange}
        className={styles.dropdown}
        controlClassName={styles.controls}
        arrowClassName={styles.arrow}
        arrowClosed={<span className={styles.arrowClosed} />}
        arrowOpen={<span className={styles.arrowOpen} />}
        placeholder={placeholder}
      />
    </div>
  );
}
