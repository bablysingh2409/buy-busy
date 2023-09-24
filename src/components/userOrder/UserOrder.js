import style from './UserOrder.module.css';

function UserOrder({ orderHistory }) {
  //   console.log(orderHistory);

  return (
    <div className={style.order_container}>
      <h2>Ordered On:- {orderHistory.date}</h2>
      <table className={style.orderTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        {orderHistory.orderItem.map((item) => (
          <tbody key={item.id}>
            <tr>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>{item.totalPrice}</td>
            </tr>
          </tbody>
        ))}
        <tfoot>
          <tr className={style.orderTable_totalPrice}>
            <td>₹{orderHistory.total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default UserOrder;
