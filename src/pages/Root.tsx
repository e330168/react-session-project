import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Navigation/MainHeader';
import { AuthProvider } from '../context/AuthProvider';
// import SessionsContextProvider from '../store/session/SessionsContextProvider';
import { Provider } from 'react-redux';
import { store } from '../store/redux-session/store';

export default function Root() {
  return (
    <>
    <AuthProvider>
      {/* <SessionsContextProvider> */}
        <Provider store={store}>
        <MainHeader/>
        <Outlet/>
        </Provider>
      {/* </SessionsContextProvider> */}
    </AuthProvider>
    </>
  );
}