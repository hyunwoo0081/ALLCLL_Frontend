import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RoutingHelper from './components/RoutingHelper.ts';
import RouteMap from './constant/RouteMap.tsx';

function App() {
  return (
    <BrowserRouter>
      <RoutingHelper/>
      <Routes>
        {RouteMap.map((route, index) => (
          <Route key={index}
                 path={route.path}
                 element={route.element}/>
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
