import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Navigation/MainHeader';
import { AuthProvider } from '../context/AuthProvider';
import SessionsContextProvider from '../store/session/SessionsContextProvider';

export default function Root() {
  return (
    <>
    <AuthProvider>
      <SessionsContextProvider>
        <MainHeader/>
        <Outlet/>
      </SessionsContextProvider>
    </AuthProvider>
    </>
  );
}