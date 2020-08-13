import React, { useState, useEffect } from 'react';
import { FiSearch, FiMenu } from 'react-icons/fi';

import styles from './style.module.scss';
import { useHistory, Link } from 'react-router-dom';

export default () => {
  const [showMenu, setShowMenu] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [searchInput, setSearchInput] = useState('');

  const history = useHistory();

  useEffect(() => {
    window.addEventListener('resize', function () {
      setWidth(this.innerWidth);
    });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    history.push(`/movies?movie=${searchInput}`);
  };

  return (
    <header className={styles.navbarMenu}>
      <section>
        <Link to="/" className={styles.logo}>
          Movie Box
        </Link>
        <button
          className={styles.menuBtn}
          onClick={() => setShowMenu(!showMenu)}
        >
          <FiMenu size={30} />
        </button>
      </section>

      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />

        <button type="submit" className={styles.searchBtn}>
          <FiSearch size={30} />
        </button>
      </form>

      {(showMenu || width > 700) && (
        <section className={styles.userSection}>
          <button className={`${styles.userBtn} ${styles.login}`}>Login</button>
          <button className={styles.userBtn}>Register</button>
        </section>
      )}
    </header>
  );
};
