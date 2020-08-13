import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import styles from './styles.module.scss';

export default function RateStars({ rating }) {
  const [stars, setStars] = useState([]);

  function constructRateStars(rate) {
    let starsArr = [];
    while (starsArr.length < 5) {
      if (rate >= 1) {
        starsArr = [...starsArr, <FaStar key={starsArr.length} color="gold" />];
        rate--;
      } else if (rate >= 0.5) {
        starsArr = [
          ...starsArr,
          <FaStarHalfAlt key={starsArr.length} color="gold" />,
        ];
        rate -= 0.5;
      } else {
        starsArr = [
          ...starsArr,
          <FaRegStar key={starsArr.length} color="gold" />,
        ];
      }
    }
    setStars(starsArr);
  }

  useEffect(() => {
    // Rounding rate to a number between 0 and 5 with one decimal
    const rate = Math.round(Number(rating) * 10) / (10 * 2);
    constructRateStars(rate);
  }, [rating]);

  return (
    <div className={styles.container} title={`${rating} out of 10`}>
      {stars}
    </div>
  );
}
