import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const State = () => {
    const [ count , setCount ] =useState(0)
    const [ like , setLike ] =useState(0)
    useEffect(()=>{
      console.log("from useEffect");
    },[count])
  return (
    <div>
      <h2>useState Hook</h2>  
      <h1>Count:{count}</h1> 
        <button onClick={()=>setCount(count + 1)}>Increment</button>
    <h2>like:{like}</h2>
    <button onClick={()=>setLike(like + 1)}>👍</button>
    <button onClick={()=>setLike(like - 1)}>👎</button>

      </div>
  )
}

export default State
