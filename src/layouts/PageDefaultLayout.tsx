import React from 'react';
import Navigation from '../components/Navigation.tsx';
import Footer from '../components/Footer.tsx';

interface IPageDefaultLayout { className?: string, children?: React.ReactNode }

function PageDefaultLayout({className='', children}: IPageDefaultLayout) {
  return (
    <>
      <Navigation/>
      <div className={`responsive ${className}`}>
        {children}
      </div>
      
      <Footer/>
    </>
  );
}

export default PageDefaultLayout;