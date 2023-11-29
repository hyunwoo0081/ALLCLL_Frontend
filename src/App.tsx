import {BrowserRouter, Route, Routes} from 'react-router-dom';
import RouteMap from './constant/RouteMap.tsx';

function App() {
  return (
    <BrowserRouter>
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
