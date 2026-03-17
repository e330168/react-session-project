import { Outlet } from 'react-router-dom';
import MainHeader from '../components/Navigation/MainHeader';
import SessionsContextProvider from '../store/SessionsContextProvider';

export default function Root() {
  return (
    <>
      <SessionsContextProvider>
        <MainHeader/>
        <Outlet/>
      </SessionsContextProvider>
    </>
  );
}