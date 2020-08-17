import React, { useState, useEffect } from 'react';

import styles from './styles.module.scss';

export default function Checkbox({
  label,
  checked,
  onCheckCallback = () => {},
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheck = () => {
    setIsChecked(prev => !prev);
    onCheckCallback();
  };

  return (
    <div className={styles.checkbox} onClick={handleCheck}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(prev => !prev)}
        onClick={handleCheck}
      />
      <p>{label}</p>
    </div>
  );
}
