import axiosInstance from '../../utils/axiosConfig';

const API_URL = '/products/';

const createProduct = async (productData) => {
  const response = await axiosInstance.post(API_URL, productData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};

const getProducts = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(API_URL + id, productData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(API_URL + productId);
  return response.data;
};

const productService = { createProduct, getProducts, deleteProduct, updateProduct };
export default productService;
