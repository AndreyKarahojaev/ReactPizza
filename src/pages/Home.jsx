import React from 'react';
import {SearchContext} from '../App'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../assets/Pagination';

export const Home = () => {

  const {searchValue} = React.useContext(SearchContext)

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
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
      const search = searchValue ? `&search=${searchValue}` : '';

      fetch(
        `https://6331b2413ea4956cfb652835.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
        .then((res) => res.json())
        .then((arr) => {
        setItems(arr);
        setIsLoading(false)
      });
      window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue,currentPage]); // зависимости на изменение категорий или сортировки, если изменения есть  = запросу

  // вариант с поиском через филшьтр 
    // .filter((obj) => {
    //if (obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
    //  return true;
    //}
    //return false;
    // })
  
  const pizzasPizzaBlock = items.map((obj) => (
      <PizzaBlock 
      title = {obj.title}
      image = {obj.imageUrl}
      sizes = {obj.sizes}
      price = {obj.price}
      category = {obj.category}
      rating = {obj.rating}
      types = {obj.types}
      />
    ));
    
    const sceletons = [...new Array(6)].map((_,i) => <Skeleton key={i} /> ); 

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index)=> setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index)=> setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? sceletons : pizzasPizzaBlock
        }
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  )

}
export default Home;