// import { data } from '../../data';
import style from './MyOrders.module.css';
import { useProductValue } from '../../context/ProductContext';
import UserOrder from '../../components/userOrder/UserOrder';

function MyOrders() {
  const { userOrder } = useProductValue();
  console.log(userOrder);

  return (
    <div className={style.orderPage_Conatiner}>
      <h1>Your Orders</h1>
      {userOrder.map((item) => (
        <UserOrder key={item.id} orderHistory={item} />
      ))}
    </div>

    // <div className={style.orderPage_Conatiner}>
    //   <h1>Your Orders</h1>
    //   <div className={style.order_container}>
    //     <h2>Ordered On:- {userOrder.date}</h2>
    //     <table className={style.orderTable}>
    //       <thead>
    //         <tr>
    //           <th>Title</th>
    //           <th>Price</th>
    //           <th>Quantity</th>
    //           <th>Total Price</th>
    //         </tr>
    //       </thead>
    //       {userOrder.orderItem.map((item) => (
    //         <tbody key={item.id}>
    //           <tr>
    //             <td>{item.title}</td>
    //             <td>{item.price}</td>
    //             <td>{item.qty}</td>
    //             <td>{item.totalPrice}</td>
    //           </tr>
    //         </tbody>
    //       ))}
    //       <tfoot>
    //         <tr className={style.orderTable_totalPrice}>
    //           <td>₹{userOrder.total}</td>
    //         </tr>
    //       </tfoot>
    //     </table>
    //   </div>
    // </div>
  );
}

export default MyOrders;
