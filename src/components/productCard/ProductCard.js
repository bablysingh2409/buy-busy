import { useState } from 'react';
import style from './ProductCard.module.css';
import plusImg from '../../Images/plus.png';
import minusImg from '../../Images/minus.png';

function ProductCard({ title, price, description, thumbnail, images }) {
  const [cart, setCart] = useState(false);
  return (
    <>
      <div className={style.product_container}>
        <div className={style.product_imgContainer}>
          <img src={images} alt="product-img" />
        </div>
        <div className={style.product_details}>
          <div className={style.product_details_productName}>
            <h3> {title}</h3>
            <p>{description}</p>
          </div>
          <div className={style.product_details_price}>
            <p>₹{price}</p>
            {cart ? (
              <div className={style.product_details_quantityContainer}>
                <img src={minusImg} alt="minus" />
                1
                <img src={plusImg} alt="plus" />
              </div>
            ) : null}
          </div>
          {!cart ? (
            <button className={style.product_details_addBtn} onClick={() => console.log('hello')}>
              Add To Cart
            </button>
          ) : (
            <button className={style.product_details_removeBtn}> Remove From Cart</button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
