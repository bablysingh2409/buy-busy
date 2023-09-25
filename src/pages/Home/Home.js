import style from './Home.module.css';
import React, { useEffect, useState } from 'react';
import Aside from '../../components/aside/Aside';
import ProductCard from '../../components/productCard/ProductCard';
import { useProductValue } from '../../context/ProductContext';

function Home() {
  const [price, setPrice] = useState(1400);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState('');
  const { products } = useProductValue();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filter products based on the category and price filters.
    const filtered = products.filter((item) => {
      const isItemExist = category.includes(item.category);
      return isItemExist || category.length === 0;
    });

    // Filter products based on the search query.
    const searchFiltered = filtered.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    console.log(searchFiltered);

    setFilteredProducts(searchFiltered);
  }, [products, category, search]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategory([...category, value]);
    } else {
      const newCategory = category.filter((f) => f !== value);
      setCategory([...newCategory]);
    }
  };

  return (
    <div className={style.homepage_container}>
      <Aside price={price} setPrice={setPrice} handleChange={handleChange} />
      <form className={style.homepage_form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={style.homepage_searchInput}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
        />
      </form>
      <div className={style.product_container_grid}>
        {filteredProducts.map((item) => {
          if (item.price <= price) {
            return <ProductCard key={item.id} product={item} />;
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default Home;
