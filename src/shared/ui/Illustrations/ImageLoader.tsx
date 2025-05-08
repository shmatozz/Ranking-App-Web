"use client";

import React, {useEffect, useState} from "react";
import {fetchImage} from "@/shared/api/common";
import Image from "next/image";
import clsx from "clsx";

interface ImageLoaderProps {
  imagePath: string;
  doubling?: boolean;
  className?: string;
}

const imageCache = new Map<string, string>();

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  imagePath,
  doubling,
  className
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (imageCache.has(imagePath)) {
      setImageSrc(imageCache.get(imagePath)!);
      return;
    }

    fetchImage(imagePath).then((blob) => {
      if (!isMounted || !blob) return;

      const objectUrl = URL.createObjectURL(blob);
      imageCache.set(imagePath, objectUrl); // Сохраняем в кэш
      setImageSrc(objectUrl);
    });

    return () => {
      isMounted = false;
    };
  }, [imagePath]);

  if (!imageSrc) return <div className={"w-full h-full bg-base-5 animate-pulse"} />;

  const imageClasses = clsx("object-contain", className);

  if (doubling) {
    return (
      <>
        <div className="absolute inset-0 z-[1] blur-3xl">
          <Image src={imageSrc} alt="LoadedBack" className="object-cover" fill />
        </div>
        <div className="relative z-[2] w-full h-full">
          <Image src={imageSrc} alt="LoadedMain" className={imageClasses} fill />
        </div>
      </>
    )
  }

  return (
    <div className="relative w-full h-full">
      <Image src={imageSrc} alt="Loaded" className={imageClasses} fill />
    </div>
  );
};
