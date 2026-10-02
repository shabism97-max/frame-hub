import React, { useState, useEffect, useRef } from 'react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  skeletonClassName?: string;
  fallbackSrc?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  skeletonClassName = '',
  fallbackSrc,
  onLoad,
  onError,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Skeleton Pulse Overlay */}
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 z-10 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-pulse ${skeletonClassName}`}
        />
      )}

      {/* Fallback Display on Error */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-3.5 text-center bg-gradient-to-b from-[#18201a] via-[#111613] to-[#0d100e] border border-[#C8A96A]/40 text-gray-300 relative overflow-hidden select-none">
          <div className="absolute inset-1.5 border border-[#C8A96A]/20 pointer-events-none rounded-t-full" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#C8A96A]/10 rounded-full blur-xl pointer-events-none" />
          <div className="pt-1 z-10">
            <span className="text-[9px] font-mono tracking-widest text-[#C8A96A] bg-[#111111]/90 px-2 py-0.5 border border-[#C8A96A]/40 uppercase shadow">
              {alt?.split(' - ')?.[0] || 'ISLAMIC ART'}
            </span>
          </div>
          <div className="my-auto space-y-1.5 z-10 px-1">
            <div className="w-10 h-10 mx-auto rounded-full border border-[#C8A96A]/50 bg-[#111111]/90 flex items-center justify-center text-[#E2CD9F] shadow-lg shadow-[#C8A96A]/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h4 className="font-serif text-[11px] font-semibold text-white line-clamp-2 leading-tight tracking-wide">
              {alt?.split(' - ')?.[1] || alt || 'Islamic Wall Art'}
            </h4>
          </div>
          <div className="pb-0.5 z-10">
            <span className="text-[8px] font-mono uppercase text-[#C8A96A]/80 tracking-wider">
              8×12" Frameless MDF Tile
            </span>
          </div>
        </div>
      )}

      {/* Image with robust loading & fallback handling */}
      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        loading={props.loading || "eager"}
        decoding={props.decoding || "async"}
        onLoad={(e) => {
          setIsLoaded(true);
          setHasError(false);
          if (onLoad) onLoad(e);
        }}
        onError={(e) => {
          // Automatic alternate extension fallback (.jpg <-> .png)
          if (currentSrc && !currentSrc.includes('__retried')) {
            if (currentSrc.endsWith('.jpg')) {
              setCurrentSrc(currentSrc.replace(/\.jpg$/, '.png') + '?__retried=1');
              setIsLoaded(false);
              return;
            } else if (currentSrc.endsWith('.png')) {
              setCurrentSrc(currentSrc.replace(/\.png$/, '.jpg') + '?__retried=1');
              setIsLoaded(false);
              return;
            }
          }
          if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            setIsLoaded(false);
          } else {
            setHasError(true);
            setIsLoaded(true);
            if (onError) onError(e);
          }
        }}
        className={`transition-opacity duration-300 ${
          isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
