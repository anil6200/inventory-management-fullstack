import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className=" container mx-auto p-4 flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left">
        <Link to="/" className="text-2xl font-bold text-blue-600">ProductInventoryApp</Link>
        <nav>
          {user ? (
            <button onClick={onLogout} className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;