import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct } from '../features/products/productsSlice';

function AddEditProduct() {
  const { id } = useParams();
  const isEditMode = !!id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  const [loading , setloading]=useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    thumbnail: null
  });

  // Prefill form in EDIT mode
  useEffect(() => {
    if (isEditMode) {
      const productToEdit = products.find((p) => p._id === id);
      if (productToEdit) {
        setFormData({
          ...productToEdit,
          thumbnail: null  //  String thumbnail ko remove kar diya
        });
      }
    }
  }, [id, isEditMode, products]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("stock", formData.stock);

    // thumbnail fix → File ho tabhi append karo
    if (formData.thumbnail && formData.thumbnail instanceof File) {
      data.append("thumbnail", formData.thumbnail);
    }

    if (isEditMode) {
      await dispatch(updateProduct({ id, data }));
    } else {
      await dispatch(createProduct(data));
    }
    setloading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEditMode ? 'Edit Product' : 'Add Product'}
        </h2>

        {['title', 'category', 'brand'].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        ))}

        {/* THUMBNAIL INPUT */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
            className="w-full px-3 py-2 border rounded"
            {...(!isEditMode && { required: true })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="3"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white 
    ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
  `}
        >
          {loading
            ? (isEditMode ? 'Updating...' : 'Creating...')
            : (isEditMode ? 'Update Product' : 'Create Product')}
        </button>

      </form>
    </div>
  );
}

export default AddEditProduct;





