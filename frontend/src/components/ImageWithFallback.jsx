import React, { useState } from 'react';
import { getImageProps } from '../utils/imageUtils';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc,
  showLoader = true,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageProps = getImageProps(src, alt, fallbackSrc);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    // Call the original error handler from getImageProps
    if (imageProps.onError) {
      imageProps.onError(e);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading placeholder */}
      {isLoading && showLoader && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        {...imageProps}
        {...props}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Error state */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
