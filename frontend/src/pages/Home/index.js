import React, { useEffect, useState } from 'react';
import api from '../../config/api';

import Header from '../../components/Header';
import './style.scss';

export default () => {
  const [popular, setPopular] = useState({});

  useEffect(async () => {
    const data = await api.get('/movies/popular').then(res => res.data);
    setPopular(data);
  }, []);

  return (
    <>
      <Header />
      <h1>Home</h1>
    </>
  );
};
