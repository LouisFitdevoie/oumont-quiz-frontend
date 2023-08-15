import { useEffect, useState } from "react";

export default function Timer({
  timeToAnswer,
  setIsTimeOver,
  timeToReadQuestion,
  backgroundMusic,
}) {
  const [seconds, setSeconds] = useState(timeToAnswer);
  const progress = ((timeToAnswer - seconds) / timeToAnswer) * 100;
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRead(true);
      playMusic();
    }, timeToReadQuestion * 1000);
  }, [timeToReadQuestion]);

  const playMusic = () => {
    backgroundMusic.fade(0, 0.5, 2000);
    backgroundMusic.play();
  };

  const stopMusic = () => {
    backgroundMusic.fade(0.5, 0, 2000);
    backgroundMusic.stop();
  };

  useEffect(() => {
    if (isRead) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => Math.max(prevSeconds - 0.05, 0));
        } else {
          stopMusic();
          clearInterval(interval);
        }
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isRead, seconds]);

  useEffect(() => {
    if (seconds === 0) {
      setTimeout(() => {
        setIsTimeOver(true);
      }, 500);
    }
  }, [seconds, setIsTimeOver]);

  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = 1 - (circumference * (100 - progress)) / 100;

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-20 h-20">
        {seconds > 0.1 && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="-rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r={circleRadius}
              stroke={seconds <= 3 ? "#f46546" : "#1e1e1e"}
              strokeWidth="10"
              fill="transparent"
              style={{
                transition: "stroke 500ms",
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
        )}
        <p
          className={`transition-all duration-500 absolute inset-0 flex justify-center items-center text-3xl font-bold ${
            seconds <= 3 ? "text-red" : "text-black"
          }`}
        >
          {Math.ceil(seconds)}
        </p>
      </div>
    </div>
  );
}
