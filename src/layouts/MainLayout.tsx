import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';

export const MainLayout = () => {
  return (
    <div className='h-full'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
