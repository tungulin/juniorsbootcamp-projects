import type { ComponentPropsWithoutRef } from 'react';

export const Main = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={`mx-3 pb-20 lg:pb-0 xl:mx-auto xl:max-w-[85rem] ${className ?? ''}`} {...props}>
    {children}
  </div>
);
