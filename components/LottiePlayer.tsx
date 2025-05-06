'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface LottiePlayerProps {
  src: string;
  loop?: boolean;
  className?: string;
}

export default function LottiePlayer({ src, loop = true, className }: LottiePlayerProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Erro ao carregar Lottie:', err));
  }, [src]);

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop={loop} className={className} />;
}
