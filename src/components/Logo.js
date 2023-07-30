import { useState } from "react";

import logo from "../assets/images/logo.png";

export default function Logo({ splashscreen = false }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const animationDuration = 100;

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, animationDuration);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setIsRotating(true);
  };

  const handleAnimationEnd = () => {
    setIsRotating(false);
  };

  const logoClass = `${splashscreen ? "logo-image-big" : "logo-image"} mr-3 ${
    isMouseOver ? (isRotating ? "rotate-left" : "-rotate-25") : "rotate-initial"
  }`;

  return (
    <div
      className="flex justify-end items-center p-3 rounded-3xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="logo-container font-black text-black">
        <img
          src={logo}
          alt="Oumont Quizz's logo"
          className={logoClass}
          onAnimationEnd={handleAnimationEnd}
        />
      </div>
      <h1
        className={
          splashscreen
            ? "text-logoSplashscreen font-black text-black cursor-default"
            : "text-logoTitle font-black text-black cursor-default"
        }
      >
        Oumont Quizz
      </h1>
      <style>
        {`
          .logo-container {
            position: relative;
            display: inline-block;
          }
          
          .rotate-initial {
            animation: rotateInitial ${animationDuration}ms ease-in-out;
          }
          
          .rotate-left {
            animation: rotateLeft ${animationDuration}ms ease-in-out;
          }

          .logo-image-big {
            width: 80px;
            height: 80px;
          }

          .logo-image {
            width: 64px;
            height: 64px;
          }
          
          @keyframes rotateLeft {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-25deg);
            }
          }
          
          @keyframes rotateInitial {
            0% {
              transform: rotate(-25deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }
        `}
      </style>
    </div>
  );
}
