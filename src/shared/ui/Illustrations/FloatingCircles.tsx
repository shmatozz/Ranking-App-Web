'use client'

import React, { useEffect, useState } from "react";
import clsx from "clsx";

type Circle = {
  id: number;
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
};

export const FloatingCircles: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);

  const generateInitialCircles = () => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth / 2),
      y: Math.random() * (window.innerHeight / 2),
      size: Math.random() * (Math.min(window.innerHeight, window.innerWidth) / 5) + (Math.min(window.innerHeight, window.innerWidth) / 2),
      velocityX: (Math.random() - 0.5) / 4,
      velocityY: (Math.random() - 0.5) / 4,
    }));
  };

  useEffect(() => {
    setCircles(generateInitialCircles());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          const newSize = (Math.min(window.innerHeight, window.innerWidth) / 5) + (Math.min(window.innerHeight, window.innerWidth) / 2);
          return { ...circle, size: newSize };
        })
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updatePositions = () => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          let { x, y, velocityX, velocityY } = circle;
          const { size } = circle;

          const centerX = x + size / 2;
          const centerY = y + size / 2;

          if (centerX <= 0 || centerX >= window.innerWidth) velocityX *= -1;
          if (centerY <= 0 || centerY >= window.innerHeight) velocityY *= -1;

          x += velocityX * 3;
          y += velocityY * 3;

          return { ...circle, x, y, velocityX, velocityY };
        })
      );
    };

    let animationFrame: number;
    const animate = () => {
      updatePositions();
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="fixed hidden inset-0 -z-10 overflow-hidden bg-blue-10 bg-opacity-50 blur-3xl lg-md:flex">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className={clsx("absolute rounded-full opacity-75 bg-gradient-to-br from-blue-10 to-blue-20")}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            top: circle.y,
            left: circle.x,
          }}
        />
      ))}
    </div>
  );
};
