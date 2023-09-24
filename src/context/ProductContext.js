import { createContext, useState, useContext, useEffect } from 'react';
import { data } from '../data';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useAuthValue } from './authContext';

export const productContext = createContext();

export function useProductValue() {
  const value = useContext(productContext);
  return value;
}

function CustomProductContext({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userOrder, setuserOrder] = useState([]);
  const [addDatatoDb, setAddDataToDb] = useState(true);
  const { loginUser } = useAuthValue();
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const productCollectionRef = collection(db, 'products');
  const cartCollectionRef = loginUser ? collection(db, `/userCart/${loginUser}/myCart`) : null;
  const userOrderCollectionRef = loginUser
    ? collection(db, `/userOrders/${loginUser}/orders`)
    : null;

  // console.log(loginUser);
  // console.log('cart----', cart);

  //adding product data to firestrore only first tym during initila render
  useEffect(() => {
    const addProductToDb = async () => {
      try {
        data.forEach(async (d) => {
          const myDataRef = await addDoc(productCollectionRef, d);
        });
      } catch (err) {
        console.log('errorrrr', err);
      }
    };
    if (!addDatatoDb) {
      addProductToDb();
    }
  }, []);

  //reading product data from firestore
  useEffect(() => {
    const getProductList = async () => {
      try {
        const snapShotData = await getDocs(productCollectionRef);
        const data = snapShotData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts([...data]);
        // console.log(data);
      } catch (err) {
        console.log('error found--', err);
      }
    };
    getProductList();
  }, []);

  //getting user cart data
  const getCartData = async () => {
    try {
      if (!cartCollectionRef) {
        setLoading(false);
        return;
      }
      let price = 0;
      const snapShot = await getDocs(cartCollectionRef);
      const cartsnap = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      cartsnap.forEach((item) => (price += item.price * item.qty));
      setCart([...cartsnap]);
      setTotalPrice(price);
      setLoading(false);
    } catch (err) {
      console.log('error in reading cart data', err);
    }
  };

  //getting user order history
  const getUserOrderData = async () => {
    try {
      if (!userOrderCollectionRef) {
        setLoading(false);
        return;
      }
      // let price = 0;
      const snapShot = await getDocs(userOrderCollectionRef);
      const orderSnap = snapShot.docs.map((doc) => ({ ...doc.data() }));
      // cartsnap.forEach((item) => (price += item.price * item.qty));
      setuserOrder([...orderSnap]);
      // setTotalPrice(price);
      setLoading(false);
    } catch (err) {
      console.log('error in reading user order data', err);
    }
  };

  useEffect(() => {
    getCartData();
    getUserOrderData();
  }, [loginUser]);

  //deleting the document of the login user
  const deleteCartItem = async (cart) => {
    try {
      const cartDoc = doc(cartCollectionRef, cart.id);
      await deleteDoc(cartDoc);
      getCartData();
    } catch (err) {
      console.log('error occured during deleting the cart item..', err);
    }
  };

  //undate the login user cart
  const updateTheCartProduct = async (cart, plusOrMinus) => {
    try {
      const cartDoc = doc(cartCollectionRef, cart.id);
      const cartData = (await getDoc(cartDoc)).data();
      let newQty;
      if (plusOrMinus == 'plus') {
        newQty = cartData.qty + 1;
      } else {
        newQty = cartData.qty - 1;
        if (newQty <= 0) {
          newQty = 1;
          deleteCartItem(cart);
          return;
        }
      }
      await updateDoc(cartDoc, { qty: newQty });
      getCartData();
    } catch (err) {
      console.log('error occured during updating the cart...', err);
    }
  };

  //adding product to login user cart
  const addToCart = async (product) => {
    if (!loginUser) return;
    const idx = cart.findIndex((item) => item.title === product.title);
    if (idx != -1) {
      updateTheCartProduct(cart[idx], 'plus');
      return;
    }
    try {
      await addDoc(cartCollectionRef, { ...product, qty: 1 });
      getCartData();
    } catch (err) {
      console.log('error comes in add to cart', err);
    }
  };

  const deleteAllCartItem = async () => {
    try {
      cart.forEach(async (item) => {
        const cartDoc = doc(cartCollectionRef, item.id);
        await deleteDoc(cartDoc);
      });

      getCartData();
      console.log('All cart items deleted successfully.');
    } catch (err) {
      console.log('Error occurred during bulk delete of cart items:', err);
    }
  };

  //adding user order history
  const addUserOrderHistory = async () => {
    if (!loginUser) return;
    const orderItem = [];
    const currDate = new Date().toISOString().slice(0, 10);

    cart.forEach((item) => {
      orderItem.push({
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qty,
        totalPrice: item.price * item.qty,
      });
      deleteAllCartItem(item);
    });
    const orders = {
      date: currDate,
      total: totalPrice,
      orderItem,
    };
    try {
      await addDoc(userOrderCollectionRef, { ...orders });
      getUserOrderData();
    } catch (err) {
      console.log('errorrrr in order history', err);
    }
  };

  if (loading) {
    return <>loading...</>;
  }

  return (
    <productContext.Provider
      value={{
        products,
        addToCart,
        cart,
        updateTheCartProduct,
        deleteCartItem,
        totalPrice,
        addUserOrderHistory,
        userOrder,
      }}
    >
      {children}
    </productContext.Provider>
  );
}

export default CustomProductContext;
