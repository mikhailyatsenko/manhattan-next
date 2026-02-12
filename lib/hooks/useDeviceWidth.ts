"use client";

import { useState, useEffect } from "react";

export const useDeviceWidth = () => {
  const [deviceWidth, setDeviceWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    // Initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceWidth;
};
