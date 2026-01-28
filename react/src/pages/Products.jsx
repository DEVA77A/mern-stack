import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

  return (
    <div>
      <h3>Products Page</h3>
      {products.map((product) => (
        <div key={product.id}>
          <h4>{product.title}</h4>
          <h3>${product.price}</h3>
          <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  )
}

export default Products