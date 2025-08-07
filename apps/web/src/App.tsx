import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Header from './components/header';
import Navbar from './components/navbar';
import Profile from './pages/profile/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "react-hot-toast"
import PLP from './pages/plp';
import Basket from './pages/basket';
import Orders from './pages/orders';
import { PdpProvider, usePdp } from './context/pdpContext';
import Pdp from './components/pdp';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const { isShowPdp, productData , closePdp } = usePdp();

  return (
    <div className='max-w-[400px] mx-auto h-screen relative flex flex-col max-h-screen'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<PLP />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      {!isLoginPage && <Navbar />}
      <AnimatePresence>
        {isShowPdp && (
          <Pdp  product={productData} onClose={closePdp} />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <PdpProvider>
          <AppContent />
        </PdpProvider>
      </Router>
      <Toaster />
    </>
  );
}

export default App;