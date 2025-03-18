import './Button.scss';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: 'primary' | 'secondary';
}

export default function Button({
    children,
    className,
    variant = 'primary',
    ...props
}: ButtonProps) {
    return (
        <button className={`button button--${variant} ${className || ''}`} {...props}>
            {children}
        </button>
    );
}
