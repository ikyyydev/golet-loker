"use client";

import { ReactNode, useEffect, useState } from "react";

export const RenderMounted = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
};
