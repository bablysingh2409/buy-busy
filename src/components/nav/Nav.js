import style from './Nav.module.css';
import { Outlet, NavLink, Link } from 'react-router-dom';
import homeImg from '../../Images/house.png';
import orderImg from '../../Images/order.png';
import cartImg from '../../Images/trolley.png';
import logoutImg from '../../Images/logout.png';
import loginImg from '../../Images/login.png';
import { useAuthValue } from '../../context/authContext';

function Nav() {
  const { loginUser, logOut } = useAuthValue();

  return (
    <>
      <header>
        <nav className={style.navbar}>
          <div className={style.nav_container}>
            <NavLink className={style.nav_logo} to="/">
              Buy Busy
            </NavLink>
            <ul className={style.nav_menu}>
              <li className={style.nav_item}>
                <Link to="/" className={style.nav_links}>
                  <span>
                    <img src={homeImg} alt="home-img" className={style.icon_styles} />
                  </span>
                  Home
                </Link>
              </li>
              {loginUser ? (
                <>
                  <li className={style.nav_item}>
                    <Link to="/myorders" className={style.nav_links}>
                      <span>
                        <img src={orderImg} alt="order-img" className={style.icon_styles} />
                      </span>
                      My Orders
                    </Link>
                  </li>
                  <li className={style.nav_item}>
                    <Link to="/cart" className={style.nav_links}>
                      <span>
                        <img src={cartImg} alt="cart-img" className={style.icon_styles} />
                      </span>
                      Cart
                    </Link>
                  </li>
                  <li className={style.nav_item}>
                    <Link to="/" className={style.nav_links} onClick={logOut}>
                      <span>
                        <img src={logoutImg} alt="logout-img" className={style.icon_styles} />
                      </span>
                      LogOut
                    </Link>
                  </li>
                </>
              ) : (
                <li className={style.nav_item}>
                  <Link to="/login" className={style.nav_links}>
                    <span>
                      <img src={loginImg} alt="login-img" className={style.icon_styles} />
                    </span>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>

      <Outlet />
    </>
  );
}

export default Nav;
