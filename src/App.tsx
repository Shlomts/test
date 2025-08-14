
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './pages/Form';
import ShowPage from './pages/ShowTriangle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/show" element={<ShowPage />} />
      </Routes>
    </Router>
  );
}

export default App;
