import { forwardRef, InputHTMLAttributes } from 'react';

import styles from './TextInput.module.css';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props: TextInputProps, ref) => {
    return <input className={styles.input} {...props} ref={ref} />;
  },
);
