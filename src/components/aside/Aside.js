import React from 'react';
import style from './Aside.module.css';

function Aside({ price, setPrice }) {
  return (
    <>
      <aside className={style.filterSideBar_container}>
        <h2>Filter</h2>
        <form>
          <label htmlFor="price">Price:{price}</label>
          <input
            className={style.price_range}
            id="price"
            type="range"
            min="1"
            max="10000"
            step="10"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <h2>Category</h2>
          <div className={style.filterSideBar_categoryContainer}>
            <div>
              <input type="checkbox" id="men-fashion" />
              <label htmlFor="men-fashion"> Men's Clothing</label>
            </div>
            <div>
              <input type="checkbox" id="women-fashion" />
              <label htmlFor="women-fashion"> Women's Clothing</label>
            </div>
            <div>
              <input type="checkbox" id="jewelery" />
              <label htmlFor="jewelery">Jewelery</label>
            </div>
            <div>
              <input type="checkbox" id="electronics" />
              <label htmlFor="electronics"> Electronics</label>
            </div>
          </div>
        </form>
      </aside>
    </>
  );
}

export default Aside;
