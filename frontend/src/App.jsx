import React from 'react'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Products from './pages/Products'
import Categories from './pages/Categories'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from './pages/Account'


const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/categories' element={<Categories/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/resetpassword' element={<ResetPassword/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/wishlist' element={<Wishlist/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/account' element={<Account/>} />
    </Routes>
    <ToastContainer />
    <Footer/>
    </>
  )
}

export default App