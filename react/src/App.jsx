import Profile from './components/Profile/'
import Parent from './components/Parent'
import State from './hooks/State'
import Form from './hooks/Form'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home' 
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service' 
import Navbar from './components/Navbar'


const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/service' element={<Service />} />
      <Route path='/products/:id' element={<ProductDetails/>}/>
    </Routes>
    </>
  )
}

export default App

