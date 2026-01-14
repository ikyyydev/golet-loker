import React from "react";
import Marquee from "react-fast-marquee";

interface MarqueeElementProps {
  children: React.ReactNode;
  withPadding?: boolean;
  direction?: "left" | "right" | "up";
}

export default function MarqueeElement({
  children,
  direction = "left",
  withPadding = true,
}: MarqueeElementProps) {
  return (
    <Marquee
      direction={direction}
      speed={25}
      className={withPadding ? "py-3" : ""}
    >
      {children}
    </Marquee>
  );
}
