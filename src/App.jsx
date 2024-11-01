import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Veg from './Veg'
import NonVeg from './NonVeg'
import Cart from './Cart'
import PurchaseHistory from './PurchaseHistory'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import './App.css'
import { useSelector } from 'react-redux'
import GoogleLoginComponent from './GoogleLoginComponent'
import { GoogleOAuthProvider } from '@react-oauth/google'
import FacebookLoginComponent from './FacebookLoginComponent'


function App() {
  const cart = useSelector(state=> state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity,0)
  return (
    <>
      <GoogleOAuthProvider clientId='446365972995-n0sv9q90q2smdg60qb37jl1lf9o7emb4.apps.googleusercontent.com'>
        <GoogleLoginComponent/>
      </GoogleOAuthProvider>
      <FacebookLoginComponent/> 
      <BrowserRouter>
        <Link to="/home">Home</Link>
        <Link to="/veg">Veg Items</Link>
        <Link to="/nonveg">Non-Veg Items</Link>
        <Link to="/cart">Cart({totalItems})</Link>
        <Link to="/purchasehistory">Purchase History</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/contactus">Contact Us</Link>


        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/veg" element={<Veg/>}/>
          <Route path="/nonveg" element={<NonVeg/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="purchasehistory" element={<PurchaseHistory/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
        </Routes>
      </BrowserRouter>
  
    </>
  )
}

export default App
