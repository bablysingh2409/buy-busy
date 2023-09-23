import style from './CartCart.module.css';
import plusImg from '../../Images/plus.png';
import minusImg from '../../Images/minus.png';
import { useProductValue } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({ cart }) {
  const { updateTheCartProduct, deleteCartItem } = useProductValue();

  return (
    <>
      <div className={style.product_container}>
        <div className={style.product_imgContainer}>
          <img src={cart.images[0]} alt="product-img" />
        </div>
        <div className={style.product_details}>
          <div className={style.product_details_productName}>
            <h3> {cart.title}</h3>
            <p>{cart.description}</p>
          </div>
          <div className={style.product_details_price}>
            <p>₹{cart.price}</p>

            <div className={style.product_details_quantityContainer}>
              <img src={minusImg} alt="minus" onClick={() => updateTheCartProduct(cart, 'minus')} />
              {cart.qty}
              <img src={plusImg} alt="plus" onClick={() => updateTheCartProduct(cart, 'plus')} />
            </div>
          </div>
          <button className={style.product_details_removeBtn} onClick={() => deleteCartItem(cart)}>
            {' '}
            Remove From Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
