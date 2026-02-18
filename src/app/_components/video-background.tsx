"use client";

import { usePathname } from "next/navigation";

export default function VideoBackground() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 -z-10 h-full w-full object-cover"
    >
      <source src="/background-video.mp4" type="video/mp4" />
    </video>
  );
}
