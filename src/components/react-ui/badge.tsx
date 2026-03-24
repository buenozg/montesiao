import * as React from 'react';

import { cn } from '@/lib/utils';

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'outline';
};

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        variant === 'outline'
          ? 'border border-primary/15 bg-white text-primary'
          : 'bg-primary text-white',
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
