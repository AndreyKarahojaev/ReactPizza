import React from 'react';
import { SearchContext } from '../App'
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../assets/Pagination';

export const Home = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false); 

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
  
  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');// сортирую по параметрам, по умолчаюнию популяр.
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';// сортировка по возрастанию и убыванию mocApi
    const category = categoryId > 0 ? `category=${categoryId}` : '';// генерация категорий
    const search = searchValue ? `search=${searchValue}` : '';
     
    axios.get(`https://6331b2413ea4956cfb652835.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false)
      });
    window.scrollTo(0, 0);
  };

    //https://6331b2413ea4956cfb652835.mockapi.io/items

  // проверка на изменение параметров и первый рендер, для проверки URL-параметров
  React.useEffect(() => {
    if (isMounted.current) {
      const querySrting = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
  
      navigate(`?${querySrting}`)
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    };

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]); // зависимости на изменение категорий или сортировки, если изменения есть  = запросу

  //Усли был первый рендер то проверяем URL параметры и сохранеяем в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []); //проверка есть ли в url параметры

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