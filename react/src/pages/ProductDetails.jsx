import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
    // const products = [
    //     {id:1, name:"Laptop", price:"30000", description: 'Acer Laptop i5 10th gen'},
    //     {id:2, name:"Mouse", price:"1000", description: 'gaming mouse with RGB light'},
    //     {id:3, name:"Mobile", price:"50000", description: '16gb ram'},
    //     {id:4, name:"Keyboard", price:"3000", description: 'gaming keyboard'}
    // ]

    const {id} = useParams()
    const [product, setProduct] = useState(null)
    
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data));
    }, [id])
    
    if (!product) {
        return <div>Product not found</div>
    }
    
    return (
        <div>
            <h1>Product Details</h1>
            <h2>{product.title}</h2>
            <p>Price: ₹{product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <p>Image: {product.image}</p>

        </div>
    )
}

export default ProductDetails