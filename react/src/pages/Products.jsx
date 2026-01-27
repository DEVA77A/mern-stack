import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
    const products=[
        {id:1,name:"laptop",price:100},
        {id:2,name:"mobile",price:200},
        {id:3,name:"guns",price:300},
    ]
  return (
    <div>
      <h3>Products Page</h3>
      {products.map((product)=>(
        <div key={product.id}>
            <h4>{product.name}</h4>
            <h3>{product.price}</h3>
            <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  )
}

export default Products
