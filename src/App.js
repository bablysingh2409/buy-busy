import './App.css';
import { SignUp } from './pages/authentication/signup/SignUp';
import Login from './pages/authentication/login/Login';
import Nav from './components/nav/Nav';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import MyOrders from './pages/Orders/MyOrders';
import CustomLoginContext from './context/authContext';
import CustomProductContext from './context/ProductContext';
import Page404 from './pages/ErrorPage/Page404';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <SignUp /> },
        { path: 'cart', element: <Cart /> },
        { path: 'myorders', element: <MyOrders /> },
      ],
    },
  ]);

  return (
    <CustomLoginContext>
      <CustomProductContext>
        <div>
          <RouterProvider router={router} />
        </div>
      </CustomProductContext>
    </CustomLoginContext>
  );
}

export default App;
