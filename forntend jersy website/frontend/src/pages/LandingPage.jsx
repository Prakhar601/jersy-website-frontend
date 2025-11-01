import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import ProductGrid from '../components/ProductGrid';

export default function LandingPage() {
  const api = useApi();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await api.get('/products');
        if (isMounted) setProducts(Array.isArray(data) ? data : (data?.items ?? []));
      } catch (e) {
        if (isMounted) setError(e?.message || 'Failed to load products');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  function handleCustomize(productId) {
    navigate(`/customize/${productId}`);
  }

  if (loading) return <div className="container">Loading products...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h1 className="page-title">Explore Jerseys</h1>
      <ProductGrid products={products} onCustomize={handleCustomize} />
    </div>
  );
}


