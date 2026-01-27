import React from 'react'
import Parent from '../components/Parent.jsx'
import State from '../hooks/State.jsx'
import Form from '../hooks/Form.jsx'
import Profile from '../components/Profile.jsx'

const Home = () => {
  return (
    <>
      <Parent/>
    <State/>
    <Form/>
    <Profile name="Deva" age={1234567890} skills={["JavaScript", "React", "Node.js"]}/>
    </>
  )
}

export default Home
