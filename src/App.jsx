import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider} from './context/AuthContext';


function App() {
  return (
    <>
    <AuthProvider>
       <Navbar/>
      <main className="min-h-screen p-4 py-6 mx-auto max-w-screen-2xl font-primary">
        <Outlet />
      </main>
      <Footer/>
    </AuthProvider>
     
    </>
  );
}

export default App;
