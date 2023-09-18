import style from './Home.module.css';
import React, { useState } from 'react';
import Aside from '../../components/aside/Aside';
import { data } from '../../data';
import ProductCard from '../../components/productCard/ProductCard';

function Home() {
  const [price, setPrice] = useState(2000);
  return (
    <div className={style.homepage_container}>
      <Aside price={price} setPrice={setPrice} />
      <form className={style.homepage_form}>
        <input type="search" placeholder="Search By Name" className={style.homepage_searchInput} />
      </form>
      <div className={style.product_container_grid}>
        {data.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            thumbnail={item.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
