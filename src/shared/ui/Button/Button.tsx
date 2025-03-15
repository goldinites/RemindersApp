import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'w-full flex gap-x-1 justify-center items-center font-medium cursor-pointer rounded-2xl transition-colors duration-300',
  variants: {
    variant: {
      primary: 'bg-indigo-500 text-white hover:bg-indigo-400',
      outline:
        'bg-white inset-ring-2 inset-ring-indigo-500 text-indigo-500 hover:text-white hover:bg-indigo-500',
      warning: 'bg-orange-700 text-white hover:bg-red-800',
    },
    size: {
      xs: 'text-xs px-1.75 py-1.25',
      sm: 'text-sm px-2 py-1.5',
      md: 'px-4 py-3',
      lg: 'px-5 py-3.5',
    },
    disabled: {
      true: 'opacity-75 pointer-events-none',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
    disabled: false,
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends ButtonVariants {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button = ({
  children,
  type = 'button',
  onClick,
  variant,
  size,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={button({ size, variant, disabled })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
