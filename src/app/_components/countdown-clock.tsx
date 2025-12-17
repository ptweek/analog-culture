"use client";
import { useState, useEffect } from "react";

export default function CountdownClock({
  targetDate,
  onComplete,
}: {
  targetDate: string;
  onComplete: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  } | null>(null);

  function calculateTimeLeft() {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.expired && onComplete) {
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  if (!timeLeft) {
    return (
      <div className="w-full max-w-4xl rounded-xl border border-red-900/30 bg-black/90 px-6 py-8 shadow-2xl backdrop-blur-md sm:px-10 sm:py-10 md:rounded-2xl md:px-16 md:py-12">
        <div className="text-center font-mono text-5xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
            --:--:--:--
          </span>
        </div>
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div className="font-mono text-3xl font-bold text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.9)] sm:text-4xl md:text-5xl">
        TIME'S UP!
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl rounded-xl border border-red-900/30 bg-black/90 px-6 py-8 shadow-2xl backdrop-blur-md sm:px-10 sm:py-10 md:rounded-2xl md:px-16 md:py-12">
      {/* Main Digital Display */}
      <div className="mb-4 text-center font-mono text-5xl font-bold tracking-wider sm:text-6xl md:text-7xl lg:text-8xl">
        <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
          {formatNumber(timeLeft.days)}:{formatNumber(timeLeft.hours)}:
          {formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
        </span>
      </div>

      {/* Labels */}
      <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs tracking-widest text-red-400/70 uppercase sm:gap-4 sm:text-sm md:text-base">
        <div>Days</div>
        <div>Hours</div>
        <div>Minutes</div>
        <div>Seconds</div>
      </div>
    </div>
  );
}
