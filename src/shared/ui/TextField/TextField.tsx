import { ChangeEvent } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';

const textField = tv({
  slots: {
    wrapper: 'flex flex-col gap-y-2 w-full',
    label: 'font-bold text-zinc-900 text-sm',
    input: 'transition w-full outline-none text-sm',
  },
  variants: {
    variant: {
      primary: {
        input:
          'rounded-2xl ring-1 bg-indigo-50 ring-indigo-300 hover:ring-indigo-500 focus:bg-white focus:ring-indigo-500 focus:ring-2',
      },
      empty: {
        input: '',
      },
    },
    size: {
      xs: {
        input: 'px-1.5 py-1',
      },
      sm: {
        input: 'px-2 py-1.5',
      },
      md: {
        input: 'px-3 py-2',
      },
      lg: {
        input: 'px-4 py-3.5',
      },
    },
    disabled: {
      true: {
        wrapper: 'pointer-events-none opacity-75',
        label: 'text-zinc-500',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type InputTypes = 'text' | 'number' | 'email' | 'password';

type TextFieldVariants = VariantProps<typeof textField>;

interface InputProps extends TextFieldVariants {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: InputTypes;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export const TextField = ({
  label,
  name,
  type,
  size = 'md',
  variant = 'primary',
  disabled,
  placeholder,
  value,
  onChange,
  onBlur,
}: InputProps) => {
  const {
    wrapper,
    label: labelStyle,
    input,
  } = textField({ disabled: disabled, size: size, variant: variant });

  return (
    <label className={wrapper()}>
      {label && <span className={labelStyle()}>{label}</span>}
      <input
        className={input()}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  );
};
