import { useParams } from "react-router-dom";
    
const ProductDetails = () => {
    const products=[
      {id:1,name:"laptop",price:45000,description:"Acer"},
      {id:2,name:"mobile",price:25000,description:"Samsung"},
      {id:3,name:"guns",price:55000,description:"Beretta" },

    ]
    const {id}=useParams();
    const product=products.find(p => p.id === parseInt(id));
  return (
    <div>
      <h1>Product Details </h1>

    </div>
  )
}
    
export default ProductDetails