import React from 'react'
import Profile from './components/Profile'
import State from './hooks/State'
import Parent from './components/Parent'
import Form from './hooks/Form'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import NavBar from './components/NavBar'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Reducer from './hooks/Reducer'

const App = () => {
  return (
    <>
    <NavBar />
    <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/service" element = {<Service/>}/>
        <Route path="/contact" element = {<Contact/>}/>
        <Route path="/product" element = {<Products/>}/>
        <Route path="/product/:id" element = {<ProductDetails/>}/>
        <Route path="/state" element = {<State/>}/>
        <Route path="/form" element = {<Form/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/reducer" element = {<Reducer/>}/>
    </Routes>
    
    </>
  )
}

export default App