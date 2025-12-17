"use client";
import { useState, useEffect } from "react";

export default function CountdownClock({
  targetDate,
  onComplete,
}: {
  targetDate: string;
  onComplete: () => void;
}) {
  // Initialize with null to indicate we haven't calculated yet
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
    // Calculate immediately on mount (client-side only)
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
  // Show loading state while we calculate client-side
  if (!timeLeft) {
    return (
      <div className="rounded-2xl bg-black/70 px-12 py-8 shadow-lg backdrop-blur-md">
        <div className="flex gap-8">
          {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-5xl leading-none font-bold text-red-900">
                --
              </span>
              <span className="mt-2 text-sm tracking-wider text-red-800 uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (timeLeft.expired) {
    return <div className="text-2xl font-bold text-gray-600">Times up!</div>;
  }

  return (
    <div className="rounded-2xl bg-black/70 px-12 py-8 shadow-lg backdrop-blur-md">
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <span className="text-5xl leading-none font-bold text-red-900">
            {timeLeft.days}
          </span>
          <span className="mt-2 text-sm tracking-wider text-red-800 uppercase">
            Days
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl leading-none font-bold text-red-900">
            {timeLeft.hours}
          </span>
          <span className="mt-2 text-sm tracking-wider text-red-800 uppercase">
            Hours
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl leading-none font-bold text-red-900">
            {timeLeft.minutes}
          </span>
          <span className="mt-2 text-sm tracking-wider text-red-800 uppercase">
            Minutes
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl leading-none font-bold text-red-900">
            {timeLeft.seconds}
          </span>
          <span className="mt-2 text-sm tracking-wider text-red-800 uppercase">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
}
