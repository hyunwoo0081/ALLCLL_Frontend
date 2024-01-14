import {useEffect, useState} from 'react';

function useMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth < 768);
      // console.log('resize');
    };

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    }
  }, []);


  return {isMobile};
}

export default useMobile;