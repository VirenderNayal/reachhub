import logo from './logo.svg';
import './App.css';
import Search from './pages/Search';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Company from './pages/Company';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/company/:symbol' element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
