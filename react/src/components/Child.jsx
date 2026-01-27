import React from 'react'

const Child = ({ send }) => {

  return (
    <div>
        <button onClick={()=>send("hello from child")}>
            Send
        </button>
    </div>
  )
}

export default Child
