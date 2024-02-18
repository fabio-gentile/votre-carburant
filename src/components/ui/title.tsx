import * as React from 'react';
import { cn } from '@/lib/utils';

const PrimaryTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn('text-2xl font-bold sm:text-3xl lg:text-4xl', className)}
      {...props}
    />
  )
);
PrimaryTitle.displayName = 'PrimaryTitle';

const SecondaryTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-xl font-bold sm:text-2xl lg:text-3xl', className)}
      {...props}
    />
  )
);
SecondaryTitle.displayName = 'SecondaryTitle';

const TertiaryTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-bold sm:text-xl lg:text-2xl', className)}
      {...props}
    />
  )
);
TertiaryTitle.displayName = 'TertiaryTitle';

export { PrimaryTitle, SecondaryTitle, TertiaryTitle };
