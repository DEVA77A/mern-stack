import React from 'react'
import { useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'

const About = () => {

  const {id} = useParams()
  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch(`https://fakestoreapi.com/users/${id || 1}`)
      .then(response => response.json())
      .then(data => setUser(data));
  },[id])

  if (!user) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <h1>About</h1>
      <h3>{user.username}</h3>
      <h3>{user.email}</h3>
      <h3>{user.name?.firstname}</h3>
      <h3>{user.name?.lastname}</h3>
    </div>

  )
}

export default About