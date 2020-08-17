import React, { useState, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';

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
        hidden
      />

      <span className={styles.checkMark}>
        <FiCheck size="100%" className={styles.checkIcon} />
      </span>

      <p>{label}</p>
    </div>
  );
}
