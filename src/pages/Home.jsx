import React from 'react';
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../assets/Pagination';

export const Home = () => {
  const dispatch = useDispatch(); 

  const { currentPage, sort, categoryId } = useSelector((state) => state.filter);
  

  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // const [categoryId, setCategoryId] = React.useState(0);

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  }

  const onChangeCategory = (id) => { 
    dispatch(setCategoryId(id))
  };

    //https://6331b2413ea4956cfb652835.mockapi.io/items

    React.useEffect(() => {
      setIsLoading(true);

      const category = categoryId > 0 ? `category=${categoryId}` : ''; // генерация категорий
      const sortBy = sort.sortProperty.replace('-', ''); // сортирую по параметрам, по умолчаюнию популяр.
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'; // сортировка по возрастанию и убыванию mocApi
      const search = searchValue ? `&search=${searchValue}` : '';
       
      axios.get(`https://6331b2413ea4956cfb652835.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => {
          setItems(res.data);
          setIsLoading(false)
      });
      window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage]); // зависимости на изменение категорий или сортировки, если изменения есть  = запросу

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
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? sceletons : pizzasPizzaBlock
        }
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )

}
export default Home;