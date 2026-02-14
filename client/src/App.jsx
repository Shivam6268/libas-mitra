
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";


// pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AllProducts from './pages/AllProducts'
import Product from './pages/ProductDetails'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import Coupons from './pages/Coupons'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Reviews from './pages/Reviews'

// components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateAdminComponent from "./components/PrivateAdminComponent"
import PrivateAuthComponents from "./components/PrivateAuthComponents"
import ProductDetails from './pages/ProductDetails';
import CartButton from "./components/CartButton"
import Profile from './pages/Profile';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/collections' element={<AllProducts />} />

        
        <Route path='/collections/:pid' element={<ProductDetails />} />

        {/* Auth Routes */}

        <Route path='/auth' element={<PrivateAuthComponents />}>
          <Route path='cart' element={<Cart />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<PrivateAdminComponent />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='users' element={<Users />} />
          <Route path='coupons' element={<Coupons />} />
        </Route>


      </Routes>
      <ToastContainer />
      <CartButton />
      <Footer />
    </Router>
  )
}

export default App