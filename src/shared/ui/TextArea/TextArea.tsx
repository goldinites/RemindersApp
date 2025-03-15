import { ChangeEvent } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';

const textArea = tv({
  slots: {
    wrapper: 'h-full flex flex-col gap-y-2',
    label: 'font-bold text-zinc-900 text-sm',
    textarea:
      'flex-1 resize-none outline-none text-sm ring-1 bg-indigo-50 ring-indigo-300 rounded-2xl hover:ring-indigo-500 focus:bg-white focus:ring-indigo-500 focus:ring-2',
  },
  variants: {
    size: {
      xs: {
        textarea: 'px-1.5 py-1',
      },
      sm: {
        textarea: 'px-2 py-1.5',
      },
      md: {
        textarea: 'px-3 py-2',
      },
      lg: {
        textarea: 'px-4 py-3.5',
      },
    },
    disabled: {
      true: {
        wrapper: 'pointer-events-none opacity-75',
        label: 'text-zinc-500',
      },
    },
  },
});

type TextAreaVariants = VariantProps<typeof textArea>;

interface TextAreaProps extends TextAreaVariants {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  label,
  name,
  size,
  disabled,
  placeholder,
  value,
  onChange,
}: TextAreaProps) => {
  const {
    wrapper,
    label: labelStyle,
    textarea,
  } = textArea({ disabled: disabled, size: size });

  return (
    <label className={wrapper()}>
      {label && <span className={labelStyle()}>{label}</span>}
      <textarea
        className={textarea()}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      ></textarea>
    </label>
  );
};
