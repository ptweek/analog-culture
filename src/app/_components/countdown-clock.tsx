import { useState, useEffect } from "react";

export default function CountdownClock({
  targetDate,
  onComplete,
}: {
  targetDate: string;
  onComplete: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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

  if (timeLeft.expired) {
    return <div className="text-2xl font-bold text-gray-600">Times up!</div>;
  }

  return (
    <div className="rounded-2xl bg-white/30 px-12 py-8 shadow-lg backdrop-blur-md">
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <span className="text-5xl leading-none font-bold text-black">
            {timeLeft.days}
          </span>
          <span className="mt-2 text-sm tracking-wider text-black uppercase">
            Days
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl leading-none font-bold text-black">
            {timeLeft.hours}
          </span>
          <span className="mt-2 text-sm tracking-wider text-black uppercase">
            Hours
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl leading-none font-bold text-black">
            {timeLeft.minutes}
          </span>
          <span className="mt-2 text-sm tracking-wider text-black uppercase">
            Minutes
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl leading-none font-bold text-black">
            {timeLeft.seconds}
          </span>
          <span className="mt-2 text-sm tracking-wider text-black uppercase">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
}
