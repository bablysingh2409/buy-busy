import './App.css';
import { SignUp } from './pages/authentication/signup/SignUp';
import Login from './pages/authentication/login/Login';
import Nav from './components/nav/Nav';
// import Home from './pages/authentication/Home/Home';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import MyOrders from './pages/Orders/MyOrders';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav />,
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
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
