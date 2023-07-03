import React from 'react';
import cl from './FeatureBlock.module.css'
import LazyLoadImage from '../../UI/LazyImage/LazyLoadImage';
const FeatureBlock = ({ title, description, imgsrc }) => {
  return (
    <div className={cl.featureBlock}>
      <LazyLoadImage className={cl.featureImg} src={imgsrc}/>
      <h2 className={cl.featureHeader}>{title}</h2>
      <p className={cl.featureTitle}>{description}</p>
    </div>
  );
};

export default FeatureBlock;