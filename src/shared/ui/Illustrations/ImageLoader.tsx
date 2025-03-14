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

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  imagePath,
  doubling,
  className
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    setImageSrc(null);
  }, [imagePath]);

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

  if (!imageSrc) return <div className={"w-full h-full bg-base-5 animate-pulse"}/>;

  if (doubling) {
    return (
      <>
        <Image src={imageSrc} alt="LoadedBack" className={clsx("absolute w-full h-full object-cover z-[1] blur-3xl")} width={100} height={100}/>
        <Image src={imageSrc} alt="LoadedMain" className={clsx("w-full h-full z-[2]", className)} width={100} height={100}/>
      </>
    )
  }

  return <Image src={imageSrc} alt="Loaded" className={clsx("w-full h-full z-0", className)} width={100} height={100}/>;
};
