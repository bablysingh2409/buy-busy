import { useState } from 'react';
import { data } from '../../data';
import style from './MyOrders.module.css';

function MyOrders() {
  const [total, setTotal] = useState(100000);
  return (
    <div className={style.orderPage_Conatiner}>
      <h1>Your Orders</h1>
      <div className={style.order_container}>
        <h2>Ordered On:- 2023-09-15</h2>
        <table className={style.orderTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          {data.map((item) => (
            <tbody>
              <tr>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>quantity</td>
                <td>total price</td>
              </tr>
            </tbody>
          ))}
          <tr className={style.orderTable_totalPrice}>
            <td>₹ {total}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;
