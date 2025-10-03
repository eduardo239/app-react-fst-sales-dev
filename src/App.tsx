import { Route, Routes } from 'react-router-dom';
import HeaderBar from './components/HeaderBar';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/ShopPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <div className="w-full min-h-screen">
      <HeaderBar />

      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}
