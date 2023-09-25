import style from './ProductCard.module.css';
import { useProductValue } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/authContext';

function ProductCard({ product }) {
  const { addToCart } = useProductValue();
  const { loginUser } = useAuthValue();
  const navigate = useNavigate();
  return (
    <>
      <div className={style.product_container}>
        <div className={style.product_imgContainer}>
          <img src={product.images[0]} alt="product-img" />
        </div>
        <div className={style.product_details}>
          <div className={style.product_details_productName}>
            <h3> {product.title}</h3>
            <p>{product.description}</p>
          </div>
          <div className={style.product_details_price}>
            <p>₹{product.price}</p>
          </div>

          <button
            className={style.product_details_addBtn}
            onClick={() => {
              if (!loginUser) navigate('/login');
              addToCart(product, product.id);
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
