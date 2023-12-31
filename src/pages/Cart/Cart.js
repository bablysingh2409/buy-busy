// import React from 'react';
import style from './Cart.module.css';
import { useProductValue } from '../../context/ProductContext';
import CartCard from '../../components/cartCard/CartCard';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify/dist/components';
// import { ToastContainer, toast } from 'react-toastify';

function Cart() {
  const { cart, totalPrice, addUserOrderHistory } = useProductValue();

  const navigate = useNavigate();
  if (!cart.length) {
    return <h1>Cart is empty!</h1>;
  }

  return (
    <div className={style.cartPage_cartContainer}>
      <aside className={style.cartPage_totalPrice}>
        <p> TotalPrice:-₹{totalPrice}/-</p>
        <button
          className={style.cartPage_purchaseBtn}
          onClick={() => {
            addUserOrderHistory();
            navigate('/myorders');
          }}
        >
          Purchase
        </button>
      </aside>
      <div className={style.product_container_grid}>
        {cart.map((item) => (
          <CartCard key={item.id} cart={item} />
        ))}
      </div>
    </div>
  );
}

export default Cart;
