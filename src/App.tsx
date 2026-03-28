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
import Todos from './pages/Todos';
import { sessionsLoader } from './store/redux-session/sessionsApi';
import { getSessionById } from  './store/redux-session/sessionsApi';
import { todosLoader } from './store/todo/todoApi';

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
          element: <ProtectedRoutes permissions={[PERMISSIONS.VIEW_TODOS]}/>,
          children: [
            {
              path: "todos",
              element: <Todos/>,
              loader: todosLoader,
            },
          ],
        },

        {
          element: <ProtectedRoutes permissions={[PERMISSIONS.VIEW_SESSIONS]}/>,
          children: [
            {
              path: "sessions",
              element: <SessionsPage/>,
              loader: sessionsLoader,
            },
          ],
        },

        {
          element: <ProtectedRoutes permissions={[PERMISSIONS.EDIT_SESSION,PERMISSIONS.DELETE_SESSION]}/>,
          children: [
          {
            path: "sessions/:id",
            element: <SessionListPage />,
            loader: getSessionById,
          },
        ],
        },
        
      ],
    }
]);


function App(){
  return <RouterProvider router={Router} />
}

export default App;
