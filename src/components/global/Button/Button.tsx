import { ButtonHTMLAttributes, forwardRef } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }: ButtonProps, ref) => {
    return (
      <button className={styles.button} {...props} ref={ref}>
        {children}
      </button>
    );
  },
);
