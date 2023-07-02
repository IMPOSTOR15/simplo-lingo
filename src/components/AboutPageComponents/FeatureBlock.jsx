import React from 'react';
import cl from './FeatureBlock.module.css'
const FeatureBlock = ({ title, description }) => {
  return (
    <div className={cl.featureBlock}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default FeatureBlock;