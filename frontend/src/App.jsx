import React from 'react'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import Products from './pages/Products'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import RequestResetLink from './pages/RequestResetLink'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from './pages/Account'
import ResetPassword from './pages/ResetPassword'
import Layout from './components/Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import NotFound from './pages/NotFound'
import AdminProducts from './pages/admin/AdminProducts'
import AdminCategories from './pages/admin/AdminCategories'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'


const App = () => {
  return (
    <>
    
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='/home' element={<Home/>}/>
      <Route path='/products' element={<Products/>} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/wishlist' element={<Wishlist/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/account' element={<Account/>} />
      {/* admin routes */}
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/admin-products' element={<AdminProducts/>}/>
      <Route path='/admin-categories' element={<AdminCategories/>}/>
      <Route path='/admin-orders' element={<AdminOrders/>}/>
      <Route path='/admin-users' element={<AdminUsers/>}/>

      <Route path='*' element={<NotFound/>} />
      </Route>


      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/request-reset-link' element={<RequestResetLink/>} />
      <Route path='/reset-password/:token' element={<ResetPassword/>} />

    </Routes>
    </>
  )
}

export default App