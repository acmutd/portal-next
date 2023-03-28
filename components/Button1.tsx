import { FC } from 'react';

const sizeClasses = {
  lg: 'py-2 px-12',
  md: 'py-2 px-8',
  sm: 'py-2 px-6',
};

const colorClasses = {
  primary:
    'bg-gradient-to-r from-pink-700 to-purple-700 hover:opacity-80 text-white font-Gilroy',
  secondary: 'text-gray-200 hover:bg-slate-700',
};

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  color?: keyof typeof colorClasses;
  size?: keyof typeof sizeClasses;
}

const Button1: FC<ButtonProps> = ({
  color = 'primary',
  size = 'sm',
  className = '',
  children,
  ...props
}) => (
  <button
    className={`rounded-full text-center cursor-pointer transition-all duration-75 w-fit ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
    {...props}
  >
    <span>{children}</span>
  </button>
);

const Button2: FC<ButtonProps> = ({
  color = 'primary',
  size = 'sm',
  className = '',
  children,
  ...props
}) => (
  <button className={`text-transparent bg-clip-text text-center cursor-pointer duration-75 w-fit bg-gradient-to-r from-[#E10087] to-[#4004C0] ${sizeClasses[size]} ${className}`} {...props}>
      <span>{children}</span>
  </button>
)

export { Button1, Button2 };
