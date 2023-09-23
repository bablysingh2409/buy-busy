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
  const [addDatatoDb, setAddDataToDb] = useState(true);
  const { loginUser } = useAuthValue();
  const [loading, setLoading] = useState(true);

  const productCollectionRef = collection(db, 'products');
  const cartCollectionRef = loginUser ? collection(db, `/userCart/${loginUser}/myCart`) : null;

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

  const getCartData = async () => {
    try {
      if (!cartCollectionRef) {
        setLoading(false);
        return;
      }

      const snapShot = await getDocs(cartCollectionRef);
      const cartsnap = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCart([...cartsnap]);
      setLoading(false);
    } catch (err) {
      console.log('error in reading cart data', err);
    }
  };

  useEffect(() => {
    getCartData();
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
      updateTheCartProduct(cart[idx]);
      return;
    }
    try {
      await addDoc(cartCollectionRef, { ...product, qty: 1 });
      getCartData();
    } catch (err) {
      console.log('error comes in add to cart', err);
    }
  };

  if (loading) {
    return <>loading...</>;
  }

  return (
    <productContext.Provider
      value={{ products, addToCart, cart, updateTheCartProduct, deleteCartItem }}
    >
      {children}
    </productContext.Provider>
  );
}

export default CustomProductContext;
