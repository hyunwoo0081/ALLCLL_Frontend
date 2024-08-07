import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RoutingHelper from './components/RoutingHelper.tsx';
import RouteMap from './constant/RouteMap.tsx';
import ScrollTop from "./components/ScrollTop.ts";

function App() {
  return (
    <BrowserRouter>
      <RoutingHelper/>
      <ScrollTop/>
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
