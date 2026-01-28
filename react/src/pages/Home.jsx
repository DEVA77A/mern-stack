import React from 'react'
import Parent from '../components/Parent'
import State from '../hooks/State'
import Form from '../hooks/Form'
import Profile from '../components/Profile'
import { Link } from 'react-router-dom'
import { userContext } from 'react'

const Home = () => {
  const {user,setUser} =React.useContext(userContext);
  return (
    <>
    <Link to = {'/form'}> Form</Link><br></br>
    <Link to = {'/state'}> useState Example</Link><br></br>
    <Link to = {'/reducer'}> Reducer Example</Link>
    <userContext.Provider value={{user,setUser}}>
    <Parent />
    <State/>
    <Form />
    <Profile name = "Geo" age = {20} skills = {["HTML","CSS","JS","ML"]} /> 
    </userContext.Provider  >
    </>
  )
}

export default Home