import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts';
import { HomePage } from './pages';

function App() {
  return (
    <div className='h-screen'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
