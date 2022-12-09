import { FC } from 'react';

interface CircularBlurProps extends React.ComponentPropsWithoutRef<'div'> {
  backgroundColor: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
}

/**
 * Blurred circular background decorator
 */
const CircularBlur: FC<CircularBlurProps> = ({
  backgroundColor,
  top,
  left,
  right,
  bottom,
  width = '100px',
  height = '100px',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`absolute ${className}`}
      {...props}
      style={{ backgroundColor, top, left, bottom, right, width, height, filter: 'blur(65px)' }}
    ></div>
  );
};

export default CircularBlur;
