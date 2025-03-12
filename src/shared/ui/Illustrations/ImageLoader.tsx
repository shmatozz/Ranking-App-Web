"use client";

import React, {useEffect, useState} from "react";
import {fetchImage} from "@/shared/api/common";
import Image from "next/image";
import clsx from "clsx";

interface ImageLoaderProps {
  imagePath: string;
  className?: string;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  imagePath,
  className
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!imageSrc) {
      fetchImage(imagePath).then((blob) => {
        if (isMounted && blob) setImageSrc(URL.createObjectURL(blob));
      });
    }

    return () => {
      isMounted = false;
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imagePath, imageSrc]);

  if (!imageSrc) return <p>Loading...</p>;

  console.log(imageSrc)

  return <Image src={imageSrc} alt="Loaded" className={clsx("w-full h-full", className)} width={100} height={100}/>;
};
