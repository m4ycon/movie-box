import React, { useState, useEffect } from 'react';
import { FiSearch, FiMenu } from 'react-icons/fi';

import styles from './style.module.scss';

export default () => {
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWidth(this.innerWidth);
    });
  }, []);

  return (
    <header className={styles.navbarMenu}>
      <section>
        <button className={styles.logo}>Movie Box</button>
        <button
          className={styles.menuBtn}
          onClick={() => setShowMenu(!showMenu)}
        >
          <FiMenu size={30} />
        </button>
      </section>

      <section className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search"
        />
        <button className={styles.searchBtn}>
          <FiSearch size={30} />
        </button>
      </section>

      {(showMenu || width > 700) && (
        <section className={styles.userSection}>
          <button className={`${styles.userBtn} ${styles.login}`}>Login</button>
          <button className={styles.userBtn}>Register</button>
        </section>
      )}
    </header>
  );
};
