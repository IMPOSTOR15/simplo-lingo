import React, { useState } from 'react';
import cl from './LazyLoadImage.module.css'
const LazyLoadImage = ({src, className}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const handleImageError = () => {
        setIsError(true);
    };

    return (
        <div className={`${cl.blurLoad} ${className} ${!isLoaded && cl.blurLoadLoading}`} style={ {backgroundImage: `url(${src.split(".")[0]}-small.jpg)`, filter: `${isLoaded && "none"}`}}>
            <img
                className={`${className} ${cl.loadedImg}`}
                src={src}
                alt=""
                loading='lazy'
                style={isLoaded  ? {opacity: 1} : {}}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
        </div>
    );
};

export default LazyLoadImage;