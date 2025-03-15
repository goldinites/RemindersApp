import { ChangeEventHandler } from 'react';
import CheckIcon from '@/src/shared/assets/icons/check.svg';
import Image from 'next/image';

import { tv, type VariantProps } from 'tailwind-variants';

const checkbox = tv({
  slots: {
    wrapper: '',
    checkbox: 'visually-hidden',
    fakeCheckbox:
      'cursor-pointer block select-none relative size-6.5 rounded-md transition duration-250',
    checkboxImage:
      'absolute top-[50%] left-[50%] -translate-[50%] transition duration-200 delay-250',
  },
  variants: {
    checked: {
      true: {
        fakeCheckbox: 'inset-ring-15 inset-ring-indigo-600',
        checkboxImage: 'scale-100',
      },
      false: {
        fakeCheckbox: 'inset-ring-1 inset-ring-indigo-300',
        checkboxImage: 'scale-0',
      },
    },
    disabled: {
      true: {
        wrapper: 'pointer-events-none opacity-75',
      },
    },
  },
});

type CheckboxVariants = VariantProps<typeof checkbox>;

interface CheckboxProps extends CheckboxVariants {
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = ({ checked, disabled, onChange }: CheckboxProps) => {
  const {
    wrapper,
    checkbox: checkboxStyles,
    fakeCheckbox,
    checkboxImage,
  } = checkbox({ checked: checked, disabled: disabled });

  return (
    <div className={wrapper()}>
      <label className={fakeCheckbox()}>
        <input
          className={checkboxStyles()}
          type={'checkbox'}
          checked={checked}
          onChange={onChange}
        />
        <Image
          className={checkboxImage()}
          src={CheckIcon}
          width={16}
          height={16}
          alt='Checkbox'
        />
      </label>
    </div>
  );
};
