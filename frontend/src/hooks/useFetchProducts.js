import { useEffect, useState } from 'react';

export default function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('import.meta.env.VITE_API_BASE ? `${import.meta.env.VITE_API_BASE}/products` : 'http://localhost:5000/products'');
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
