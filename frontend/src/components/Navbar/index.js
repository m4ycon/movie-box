import React from 'react';
import { FiSearch, FiMenu } from 'react-icons/fi';

import styles from './style.module.scss';

export default () => {
  return (
    <header className={styles.navbarMenu}>
      <section>
        <button className={styles.logo}>Movie Box</button>
        <button className={styles.menuBtn}>
          <FiMenu size={25} />
        </button>
      </section>

      <section className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search"
        />
        <button className={styles.searchBtn}>
          <FiSearch size={25} />
        </button>
      </section>

      <section className={styles.userSection}>
        <button className={`${styles.userBtn} ${styles.login}`}>Login</button>
        <button className={styles.userBtn}>Register</button>
      </section>
    </header>
  );
};
