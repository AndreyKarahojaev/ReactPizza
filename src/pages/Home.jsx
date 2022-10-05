import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {

  
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

    //https://6331b2413ea4956cfb652835.mockapi.io/items

    React.useEffect(() => {
      setIsLoading(true);

      const category = categoryId > 0 ? `category=${categoryId}` : ''; // генерация категорий
      const sortBy = sortType.sortProperty.replace('-', ''); // сортирую по параметрам, по умолчаюнию популяр.
      const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'; // сортировка по возрастанию и убыванию mocApi


      fetch(
        `https://6331b2413ea4956cfb652835.mockapi.io/items?
        ${category}&sortBy=${sortBy}&order=desc${order}`,
      )
        .then((res) => res.json())
        .then((arr) => {
        setItems(arr);
        setIsLoading(false)
      });
      window.scrollTo(0, 0);
    }, [categoryId, sortType]); // зависимости на изменение категорий или сортировки, если изменения есть  = запросу

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index)=> setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index)=> setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading 
          ? [...new Array(6)].map((_,i) => <Skeleton key={i} /> ) 
          : items.map((obj) => (
            <PizzaBlock 
            title = {obj.title}
            image = {obj.imageUrl}
            sizes = {obj.sizes}
            price = {obj.price}
            category = {obj.category}
            rating = {obj.rating}
            types = {obj.types}
            />
          ))
        }
      </div>
    </div>
  )

}
export default Home;