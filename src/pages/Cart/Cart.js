import React from 'react';
import style from './Cart.module.css';
// import { data } from '../../data';
import ProductCard from '../../components/productCard/ProductCard';
import { useProductValue } from '../../context/ProductContext';
import CartCard from '../../components/cartCard/CartCard';

function Cart() {
  const { cart } = useProductValue();
  console.log(4);
  // if (!cart.length) {
  //   return <p>Cart is empty now</p>;
  // }

  // console.log(cart);
  return (
    <div className={style.cartPage_cartContainer}>
      <aside className={style.cartPage_totalPrice}>
        <p> TotalPrice:-₹21000/-</p>
        <button className={style.cartPage_purchaseBtn}>Purchase</button>
      </aside>
      <div className={style.product_container_grid}>
        {cart.map((item) => (
          <CartCard
            key={item.id}
            price={item.price}
            description={item.description}
            title={item.title}
            images={item.images[0]}
            qty={item.qty}
            cart={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
