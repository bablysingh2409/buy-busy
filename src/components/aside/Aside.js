import React from 'react';
import style from './Aside.module.css';

function Aside({ price, setPrice, handleChange }) {
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
            max="1500"
            step="10"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              console.log(price);
            }}
          />
          <h2>Category</h2>
          <div className={style.filterSideBar_categoryContainer}>
            <div>
              <input
                type="checkbox"
                id="home-decoration"
                value="home-decoration"
                onChange={handleChange}
              />
              <label htmlFor="home-decoration">Home-decoration</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="smart-phones"
                value="smartphones"
                onChange={handleChange}
              />
              <label htmlFor="smart-phones">Smart Phones</label>
            </div>
            <div>
              <input type="checkbox" id="laptops" value="laptops" onChange={handleChange} />
              <label htmlFor="laptops">Laptops</label>
            </div>
            <div>
              <input type="checkbox" id="fragrances" value="fragrances" onChange={handleChange} />
              <label htmlFor="fragrances">Fragrances</label>
            </div>
            <div>
              <input type="checkbox" id="skincare" value="skincare" onChange={handleChange} />
              <label htmlFor="skincare">Skincare</label>
            </div>
            <div>
              <input type="checkbox" id="groceries" value="groceries" onChange={handleChange} />
              <label htmlFor="groceries">Groceries</label>
            </div>
          </div>
        </form>
      </aside>
    </>
  );
}

export default Aside;
