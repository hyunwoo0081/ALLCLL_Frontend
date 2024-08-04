import React, {useEffect, useMemo, useState} from 'react';
import {Location} from 'react-router-dom';

interface IUnderlineStyle {
  width: number;
  transform: number;
}

type NavRoute = Array<{
  name: string;
  path: string;
}>

function useNavHook(NavRoutes: NavRoute, navListRef: React.RefObject<HTMLUListElement>, location: Location, padding: number, leftMargin: number) {
  const [selected, setSelected] = useState<number>(
    NavRoutes.findIndex(route => route.path === location.pathname)
  );
  const [underlineStyle, setUnderlineStyle] = useState<IUnderlineStyle>(
    getUnderlineStyleDefault()
  );
  const memoUnderlineStyle = useMemo<React.CSSProperties>(() => {
    // console.log('Underline style updated', selected, underlineStyle.width, underlineStyle.transform);

    return {
      width: underlineStyle.width + 'px',
      transform: `translate(${underlineStyle.transform}px, 1px)`
    };
  }, [underlineStyle.width, underlineStyle.transform]);

  function getUnderlineStyle(target: HTMLAnchorElement) {
    const width = target.offsetWidth - padding*2;
    const transformX = target.offsetLeft - leftMargin + padding;

    return {
      width: width,
      transform: transformX
    };
  }

  function getUnderlineStyleDefault() {
    // console.log('Underline style default');
    const $ul = navListRef.current ? navListRef.current :
      document.querySelector('.navigation_shortcuts ul') as HTMLUListElement;

    if (!$ul || selected < 0)
      return {width: 0, transform: 0};

    const target = $ul.children[selected].children[0] as HTMLAnchorElement;

    if (target)
      return getUnderlineStyle(target);
    return {width: 0, transform: 0};
  }

  function setUnderlineTarget(target?: HTMLAnchorElement) {
    const style = target ? getUnderlineStyle(target) : getUnderlineStyleDefault();

    if (style)
      setUnderlineStyle(style);
  }

  useEffect(() => {
    setSelected(NavRoutes.findIndex(route => route.path === location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    setUnderlineTarget();
  }, []);

  return {selected, memoUnderlineStyle, setUnderlineTarget};
}

export default useNavHook;