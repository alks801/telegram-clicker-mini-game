import React from 'react';
import styles from './ResourceCounter.module.scss';

interface ResourceCounterProps {
  coins: number;
  crystals: number;
  energy: number;
}

export const ResourceCounter = ({ coins, crystals, energy }: ResourceCounterProps) => {
  return (
    <div className={styles.resourceCounter}>
      <div className={styles.resource}>
        <span role="img" aria-label="coins">
          💰
        </span>
        {coins}
      </div>
      <div className={styles.resource}>
        <span role="img" aria-label="crystals">
          💎
        </span>
        {crystals}
      </div>
      <div className={styles.resource}>
        <span role="img" aria-label="energy">
          ⚡
        </span>
        {energy}
      </div>
    </div>
  );
};