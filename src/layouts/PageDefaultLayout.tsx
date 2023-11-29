import React from 'react';
import Navigation from '../components/Navigation.tsx';

interface IPageDefaultLayout { className?: string, children?: React.ReactNode }

function PageDefaultLayout({className='', children}: IPageDefaultLayout) {
  return (
    <>
      <Navigation/>
      <div className={`responsive ${className}`}>
        {children}
      </div>
    </>
  );
}

export default PageDefaultLayout;