import { FC } from 'react';

const sizeClasses = {
  lg: 'py-2 px-12',
  md: 'py-2 px-8',
  sm: 'py-1 px-6',
};

const colorClasses = {
  primary:
    'bg-gradient-to-r from-pink-700 to-purple-700 hover:opacity-80 text-white font-Gilroy font-bold',
  secondary: 'text-gray-200 hover:bg-slate-700',
};

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  color?: keyof typeof colorClasses;
  size?: keyof typeof sizeClasses;
}

const Button: FC<ButtonProps> = ({
  color = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => (
  <button
    className={`text-center cursor-pointer transition-all duration-75 w-fit ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
    {...props}
  >
    <span>{children}</span>
  </button>
);

export default Button;
