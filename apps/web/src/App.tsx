import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>صفحه اصلی</div>} />
        <Route path="/login" element={<div>صفحه ورود</div>} />
      </Routes>
    </Router>
  );
}

export default App;