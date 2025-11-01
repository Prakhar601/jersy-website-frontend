import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';
import LandingPage from './pages/LandingPage';
import CustomizePage from './pages/CustomizePage';
import './styles.css';

export default function App() {
  return (
    <CartProvider>
      <div className="app-root">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/customize/:id" element={<CustomizePage />} />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}


