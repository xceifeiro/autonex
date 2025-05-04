// components/LottiePlayer.tsx
import { FC } from 'react';
import Lottie from 'lottie-react';

interface LottiePlayerProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

export const LottiePlayer: FC<LottiePlayerProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  style,
}) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={style}
    />
  );
};
