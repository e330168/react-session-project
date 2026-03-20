import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Root from './pages/Root';
import HomePage from './pages/Home';
import SessionsPage from './pages/Sessions';
import SessionListPage from './pages/Session';
import Login from './components/Navigation/__auth/login';

const Router= createBrowserRouter([
    {
      path:'/',
      element:<Root/>,
      children:[
          {
            index: true,
            element: <HomePage/>
          },
        {path:'sessions', element:<SessionsPage/>},
        {path:'sessions/:id', element:<SessionListPage/>},
        {path:'login', element:<Login/>},
      ],
    }
]);


function App(){
  return <RouterProvider router={Router} />
}

export default App;
