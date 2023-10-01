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
  );
}

export default MyOrders;
