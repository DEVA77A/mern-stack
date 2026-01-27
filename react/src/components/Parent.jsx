import React from 'react'
import Child from './Child'

const Parent = () => {
    const getdata=(data)=>{
        console.log("data from child:",data)
    }
  return (
    <div>
      <Child send={getdata}/>
    </div>
  )
}

export default Parent

