import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Header from './components/header';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <div className='max-w-screen-sm mx-auto h-screen relative'>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;