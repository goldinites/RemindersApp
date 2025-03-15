import { tv, type VariantProps } from 'tailwind-variants';

const heading = tv({
  base: 'font-bold text-zinc-900',
  variants: {
    type: {
      h1: 'font-black text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base',
    },
  },
  defaultVariants: {
    type: 'h2',
  },
});

type HeadingVariants = VariantProps<typeof heading>;

interface HeadingProps extends HeadingVariants {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
}

export const Heading = ({
  children,
  tag = 'h2',
  type = 'h2',
}: HeadingProps) => {
  const defineHeading = () => {
    switch (tag) {
      case 'h1':
        return <h1 className={heading({ type })}>{children}</h1>;
      case 'h2':
        return <h2 className={heading({ type })}>{children}</h2>;
      case 'h3':
        return <h3 className={heading({ type })}>{children}</h3>;
      case 'h4':
        return <h4 className={heading({ type })}>{children}</h4>;
      case 'h5':
        return <h5 className={heading({ type })}>{children}</h5>;
      case 'h6':
        return <h6 className={heading({ type })}>{children}</h6>;
    }
  };

  return defineHeading();
};
