import React, { useState, Children } from 'react';

import styles from './styles.module.scss';

import { FiChevronsDown } from 'react-icons/fi';

export default function Dropdown({ children }) {
  const [hideDrop, setHideDrop] = useState(true);

  const handleDropdownClick = () => setHideDrop(prev => !prev);
  const handleMouseLeaveDrop = () => setHideDrop(true);

  return (
    <>
      <button className={styles.btnDropdown} onClick={handleDropdownClick}>
        <FiChevronsDown size={20} color="white" />
      </button>
      <ul
        className={styles.dropdown}
        hidden={hideDrop}
        onMouseLeave={handleMouseLeaveDrop}
      >
        {Children.toArray(children).map((child, i) => (
          <li key={i} className={styles.dropdownItem}>
            {child}
          </li>
        ))}
      </ul>
    </>
  );
}
