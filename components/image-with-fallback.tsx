"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  fallbackSrc: string;
  alt: string;
  src: string;
  [key: string]: unknown; // Allow other props
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  fallbackSrc,
  alt,
  src,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      src={imgSrc}
      {...props}
    />
  );
};

export default ImageWithFallback;
