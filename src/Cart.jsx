import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, remove } from './store';

function Cart() {
  const cartProducts = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const items = cartProducts.length === 0 ? (<p> Your cart is empty</p>): cartProducts.map((product,index) =>
    <li key={index}>
      {product.name} - ${product.price}    <button onClick={()=>dispatch(decrement(product))}>-</button> {product.quantity} 
       <button onClick={()=>dispatch(increment(product))}>+</button>   <button onClick={()=>dispatch(remove(product))}>Remove</button>
    </li>
  )

  // Take a variable to maintain the discount percentage
  const [discountPercent,setDiscountPercent] = useState(0);

  // This is called when we click on discount button
  const handleApplyDiscount = (discountValue) =>{
    setDiscountPercent(discountValue);
  }

  const [couponCode,setCouponCode]= useState('');
  const [couponDiscountPercentage,setCouponDisountPercentage] = useState(0);

  const handleCouponDiscount=()=>{
    switch (couponCode.toUpperCase()){
      case 'RATAN10':
        setCouponDisountPercentage(10);
        break;
      case 'RATAN20':
        setCouponDisountPercentage(20);
        break;
      case 'RAMU30':
        setCouponDisountPercentage(30);
        break;
      default:
        alert("Invalid coupon code");
        setCouponDisountPercentage(0);
    }
  }

  // main  logics to calculate the all amounts
  const calculateTotal= () => {
    // calculate the total
    const total = cartProducts.reduce((sum,item) => sum + item.price * item.quantity,0);
    
    // calculate the discount
    const discountAmount = total * (discountPercent/100);

    // calculate the coupon discount
    const couponDiscount = total * (couponDiscountPercentage/100);

    // calculate netAmount 
    const netAmount = total - discountAmount-couponDiscount;

    return{
      total:parseFloat(total.toFixed(2)),
      discountAmount:parseFloat(discountAmount.toFixed(2)),
      netAmount:parseFloat(netAmount.toFixed(2)),
      couponDiscount:parseFloat(couponDiscount.toFixed(2))
    }
  }
 const {total,discountAmount,netAmount,couponDiscount} = calculateTotal();


  return (
    <>
     <h1>My Cart</h1>
       <ul>{items}</ul>
       <p>Total before discounts: ${total}</p>
       <button onClick={() => handleApplyDiscount(10)}>Apply 10% dicount</button>
       <button onClick={() => handleApplyDiscount(20)}>Apply 20% dicount</button>
       <button onClick={() => handleApplyDiscount(30)}>Apply 30% dicount</button>
       <p> </p>
      
       <label>Coupon Code:</label>
       <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder='Enter the coupon code'/>
       <button onClick={handleCouponDiscount}>Apply Coupon</button>
       <p>Discount percent Applied: ${discountPercent}</p>
       <p>Discount Amount: ${discountAmount} </p>
       <p>Coupon Discount: ${couponDiscount}</p>
       <p>Net Amount After discount: ${netAmount}</p>
     
    </>
  )
}

export default Cart;
