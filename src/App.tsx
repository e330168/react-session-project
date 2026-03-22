import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Root from './pages/Root';
import HomePage from './pages/Home';
import SessionsPage from './pages/Sessions';
import SessionListPage from './pages/Session';
import Login from './components/Navigation/__auth/Login';
import Unauthorized from './components/Navigation/__auth/Unauthorized';
import ProtectedRoutes from './components/Navigation/ProtectedRoutes';
import { PERMISSIONS } from './helpers/roles';

const Router= createBrowserRouter([
    {
      path:'/',
      element:<Root/>,
      children:[
          {
            index: true,
            element: <HomePage/>
          },
        {path:'login', element:<Login/>},
        {path:'unauthorized', element:<Unauthorized/>},

        {
          element: <ProtectedRoutes permissions={[PERMISSIONS.VIEW_SESSIONS,PERMISSIONS.EDIT_SESSION]} />,
            children: [
              {path:'sessions', element:<SessionsPage/>},
              {path:'sessions/:id', element:<SessionListPage/>},
          ]
        }
      ],
    }
]);


function App(){
  return <RouterProvider router={Router} />
}

export default App;
