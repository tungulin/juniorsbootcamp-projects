import type { PropsWithChildren } from 'react';

export const Main = (props: PropsWithChildren) => (
  <div className='lg:mx-auto lg:max-w-[75rem]'>{props.children}</div>
);
