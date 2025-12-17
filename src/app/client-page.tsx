"use client";

import CountdownClock from "./_components/countdown-clock";

export default function ClientHomePage() {
  return (
    <CountdownClock
      targetDate="2026-01-25T20:00:00-05:00"
      onComplete={() => console.log("Countdown finished!")}
    />
  );
}
