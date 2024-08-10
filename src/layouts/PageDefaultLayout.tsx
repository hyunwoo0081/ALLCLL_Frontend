import React, {useEffect, useRef, useState} from 'react';
import Navigation from '@components/Navigation.tsx';
import Footer from '@components/Footer.tsx';

interface IPageDefaultLayout { className?: string, children?: React.ReactNode }

function PageDefaultLayout({className='', children}: IPageDefaultLayout) {
  const [navHeight, setNavHeight] = useState<number>(0);
  const responsive = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = document.querySelector('nav');

    if (nav && nav.clientHeight && responsive.current && responsive.current.clientHeight) {
      const computedStyle = window.getComputedStyle(responsive.current);

      setNavHeight(
        nav.clientHeight
        + parseInt(computedStyle.paddingTop)
        + parseInt(computedStyle.paddingBottom)
        + parseInt(computedStyle.marginTop)
        + parseInt(computedStyle.marginBottom)
      );
    }
  }, []);

  return (
    <>
      <Navigation/>
      <div className={`responsive ${className}`}
           ref={responsive}
           style={{
             minHeight: `calc(100vh - ${navHeight}px)`,
           }}>
        {children}
      </div>
      
      <Footer/>
    </>
  );
}

export default PageDefaultLayout;