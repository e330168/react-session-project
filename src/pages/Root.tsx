import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Navigation/MainHeader';
import SessionsContextProvider from '../store/SessionsContextProvider';
import { AuthProvider } from '../context/AuthProvider';

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