import * as React from 'react';

import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'default' | 'lg';
};

function Button({ className, size = 'default', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70',
        size === 'lg' ? 'h-12 px-6 text-sm font-semibold' : 'h-10 px-4 text-sm font-medium',
        className,
      )}
      {...props}
    />
  );
}

export { Button };
