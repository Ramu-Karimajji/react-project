import React from 'react'
import { useSelector } from 'react-redux';

function Veg() {
  const vegProducts = useSelector(state => state.products.veg)
  const items = vegProducts.map((product,index) =>
    <li key={index}>
      {product.name} - ${product.price.toFixed(2)}
      <button>Add to Cart</button>
    </li>
  )
  return (
    <>
      <h1>Veg Products</h1>
      <ul>
        {items}
      </ul>
    </>
  )
}

export default Veg;
