import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Form = () => {
    const [form ,setform]=useState({
        name:"",
        email:"",
        age:"",
        department:""

    })
    useEffect(()=>{
          console.log("from useEffect");
        })
    const handlechange=(e)=>{
        const {name,value}=e.target      
        setform((prev)=>({
            ...prev,
            [name]:value
        }))

    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        console.log(form)
    }
    return (
    <div>
        <form onSubmit={handlesubmit}>
            <lable htmlfor="name">Name</lable>
            <input type="text" name="name" value={form.name} onChange={handlechange}/><br/>
            <lable htmlfor="email">Email</lable>
            <input type="email" name="email" value={form.email} onChange={handlechange}/><br/>
            <lable htmlfor="age">Age</lable>    
            <input type="number" name="age" value={form.age} onChange={handlechange}/><br/>
            <lable htmlfor="department">Department</lable>
            <input type="text" name="department" value={form.department} onChange={handlechange}/><br/>
            <button type="submit">Submit</button>
        </form>

    </div>
  )
}

export default Form
