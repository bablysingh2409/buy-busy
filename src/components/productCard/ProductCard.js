import React from 'react';
import style from './ProductCard.module.css';

function ProductCard({ title, price, description, thumbnail }) {
  return (
    <>
      <div className={style.product_container}>
        <div className={style.product_imgContainer}>
          <img src={thumbnail} />
        </div>
        <div className={style.product_details}>
          <div className={style.product_details_productName}>
            <h3> {title}</h3>
            <p>{description}</p>
          </div>
          <div className={style.product_details_price}>
            <p>₹{price}</p>
          </div>
          <button className={style.product_details_addBtn}>Add To Cart</button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
