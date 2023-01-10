import Nav from '@/components/nav';
import { FC, ReactNode } from 'react';
import SimpleFooter from '@/components/SimpleFooter';

type Props = {
  children: ReactNode;
  contentWidth?: number;
  paddingTop?: number;
  layout?: any;
};

export default function SimpleLayout({ children, contentWidth = 800, paddingTop = 80, layout = {} }: Props) {
  return (
    <>
      <Nav isSimple />
      {layout === null ? (
        children
      ) : (
        <div
          className={'mx-auto min-h-screen px-5'}
          style={{
            paddingTop: `${paddingTop}px`,
            maxWidth: `${contentWidth}px`,
          }}
        >
          {children}
        </div>
      )}
      <SimpleFooter />
    </>
  );
}
