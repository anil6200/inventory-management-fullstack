import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../src/components/header';
import Login from '../src/pages/Login';
import Register from '../src/pages/register'; 
import Dashboard from '../src/pages/Dashboard';
import AddEditProduct from '../src/pages/AddEditProduct';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
            {/* Public Routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Protected Routes */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/add-product' element={<AddEditProduct />} />
            <Route path='/edit-product/:id' element={<AddEditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;