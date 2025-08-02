import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Header from './components/header';
import Navbar from './components/navbar';
import PLP from './pages/plp';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className='max-w-[400px] mx-auto h-screen relative flex flex-col max-h-screen'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<PLP />} />
      </Routes>
      {!isLoginPage && <Navbar />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;