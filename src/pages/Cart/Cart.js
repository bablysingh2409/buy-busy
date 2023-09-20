import React from 'react';
import style from './Cart.module.css';
import { data } from '../../data';
import ProductCard from '../../components/productCard/ProductCard';

function Cart() {
  return (
    <div className={style.cartPage_cartContainer}>
      <aside className={style.cartPage_totalPrice}>
        <p> TotalPrice:-₹21000/-</p>
        <button className={style.cartPage_purchaseBtn}>Purchase</button>
      </aside>
      <div className={style.product_container_grid}>
        {data.map((item) => (
          <ProductCard
            key={item.id}
            price={item.price}
            description={item.description}
            title={item.title}
            images={item.images[0]}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
