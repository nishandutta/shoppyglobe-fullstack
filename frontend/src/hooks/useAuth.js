import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";

export default function useAuth() {
  const token = useSelector((s) => s.user.token);
  const dispatch = useDispatch();

  const isAuthenticated = Boolean(token);
  const signOut = () => dispatch(logout());

  return { token, isAuthenticated, logout: signOut };
}
