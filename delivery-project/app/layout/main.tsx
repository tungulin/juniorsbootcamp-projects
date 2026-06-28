import type { ComponentPropsWithoutRef } from 'react';

export const Main = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={`lg:mx-auto lg:max-w-[75rem] ${className ?? ''}`} {...props}>
    {children}
  </div>
);
