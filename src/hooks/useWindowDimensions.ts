import { useState, useEffect } from 'react';

interface IWindowDimension {
  width: number;
  height: number;
}

function getWindowDimensions(): IWindowDimension {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return { width: 0, height: 0 };
}

export default function useWindowDimensions(): IWindowDimension {
  const [windowDimensions, setWindowDimensions] = useState<IWindowDimension>(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
