import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import AdminProducts from './pages/Admin/AdminProducts ';
import AdminOrders from './pages/Admin/AdminOrders';
import CreateProduct from './pages/Admin/CreateProduct';
import EditProduct from './pages/Admin/EditProduct';

import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ResetPassword from './pages/Auth/ResetPassword';
import ConfirmAccount from './pages/Auth/ConfirmAccount';

import Favorites from './pages/Favorites/Favorites ';
import Cart from './pages/Cart/Cart';

import NotAuthorized from './pages/Auth/NotAuthorized';
import NotFound from './pages/Auth/NotFound';
import Profile from './pages/Profile/Profile';
import MyOrders from './pages/MyOrders/MyOrders';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute ';
import GuestRoute from './routes/GuestRoute';

import DragAndDropExample from './pages/DragAndDropExample';
import Checkout from './pages/Checkout/Checkout ';
function App() {

  return (

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}>
             {/* Rutas publicas  */}
            <Route path='/' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/product/:slugWithId' element={<ProductDetail/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>

            {/* Rutas privadas  */}
            <Route element={<ProtectedRoute/>}>
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/profile' element={<Profile />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/cart/checkout/:id" element={<Checkout />} />
            </Route>
          </Route>

          
          {/* Rutas administrativas (sin MainLayout) */}
          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/products/new" element={<CreateProduct />} />
              <Route path="/admin/products/edit/:slugWithId" element={<EditProduct />} />
              <Route path="/admin/orders/" element={<AdminOrders />} />
            </Route>
          </Route>
          
          {/* Rutas de autenticación */}
          <Route element={<GuestRoute/>}>
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path="/auth/confirm/:token" element={<ConfirmAccount />} />
            <Route path='/auth/forgot-password' element={<ForgotPassword />} />
            <Route path='/auth/reset-password/:token' element={<ResetPassword />} />
          </Route>

          <Route path="/not-authorized" element={<NotAuthorized />} />

          <Route path="/drag" element={<DragAndDropExample />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App
