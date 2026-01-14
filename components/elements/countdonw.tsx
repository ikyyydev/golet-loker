"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LAUNCH_DATE = new Date("2026-03-01T00:00:00");

function calculateTimeLeft(): TimeLeft {
  const difference = +LAUNCH_DATE - +new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    () => calculateTimeLeft() // ✅ lazy initialization
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <TimeBox label="Hari" value={timeLeft.days} />
      <TimeBox label="Jam" value={timeLeft.hours} />
      <TimeBox label="Menit" value={timeLeft.minutes} />
      <TimeBox label="Detik" value={timeLeft.seconds} />
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white/10 px-6 py-5 text-center backdrop-blur">
      <p className="text-3xl font-bold sm:text-4xl">
        {String(value).padStart(2, "0")}
      </p>
      <span className="mt-1 block text-sm text-white/70">{label}</span>
    </div>
  );
}
