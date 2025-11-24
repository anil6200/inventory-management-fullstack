import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, deleteProduct } from '../features/products/productsSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getProducts());
  }, [user, navigate, dispatch]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <Link
          to="/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="
                bg-white rounded-lg shadow-md overflow-hidden 
                transition-all duration-300 cursor-pointer

                hover:shadow-2xl hover:scale-[1.04]
                hover:border hover:border-blue-500/40
                hover:shadow-blue-300/60

                hover:-translate-y-2
                hover:rotate-[0.5deg]
              "
            >
              <img
                src={product.thumbnail?.url || 'https://via.placeholder.com/150'}
                alt={product.title}
                className="w-full h-48 object-contain rounded"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 text-sm mb-2 truncate">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>
                <div className="flex justify-between">
                  <Link
                    to={`/edit-product/${product._id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch(deleteProduct(product._id))}
                    className="text-red-500 hover:text-red-700 font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
 