import { useState, useEffect } from 'react';

export default function useFetchProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`import.meta.env.VITE_API_BASE ? `${import.meta.env.VITE_API_BASE}/products/` : 'http://localhost:5000/products/'${id}`);
        if (!res.ok) throw new Error('Failed to fetch product details');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    };

    fetchProduct();
  }, [id]);

  return { product, error };
}
