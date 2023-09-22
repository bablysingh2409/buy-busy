import { createContext, useState, useContext, useEffect } from 'react';
import { data } from '../data';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { useAuthValue } from './authContext';
import { useNavigate } from 'react-router-dom';

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
    console.log(1);
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
  }, [loginUser, loading]);

  //adding product to login user cart
  const addToCart = async (product) => {
    if (!loginUser) return;
    try {
      await addDoc(cartCollectionRef, { ...product, qyt: 1 });
      setLoading(true);
    } catch (err) {
      console.log('error comes in add to cart', err);
    }
  };

  if (loading) {
    return <>loading...</>;
  }

  return (
    <productContext.Provider value={{ products, addToCart, cart }}>
      {children}
    </productContext.Provider>
  );
}

export default CustomProductContext;
