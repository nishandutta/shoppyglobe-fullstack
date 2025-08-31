const API_URL = "http://localhost:5555";

const json = (res) => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// PRODUCTS
export const apiFetchProducts = () =>
  fetch(`${API_URL}/products`).then(json);

export const apiFetchProductById = (id) =>
  fetch(`${API_URL}/products/${id}`).then(json);

// AUTH
export const apiRegister = (payload) =>
  fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(json);

export const apiLogin = (payload) =>
  fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(json);

// CART
export const apiFetchCart = () =>
  fetch(`${API_URL}/cart`, {
    headers: { ...getAuthHeader() },
  }).then(json);

export const apiAddToCart = ({ productId, quantity }) =>
  fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ productId, quantity }),
  }).then(json);

export const apiUpdateCartItem = ({ productId, quantity }) =>
  fetch(`${API_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ quantity }),
  }).then(json);

export const apiRemoveFromCart = (productId) =>
  fetch(`${API_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: { ...getAuthHeader() },
  }).then(json);

export const apiClearCart = async () => {
  const res = await fetch(`${API_URL}/cart/clear`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });
  if (!res.ok) throw new Error("Failed to clear cart");
  return res.json();
};
