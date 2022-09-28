import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {

  
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)

    //https://6331b2413ea4956cfb652835.mockapi.io/items

    React.useEffect(() => {

      fetch('https://6331b2413ea4956cfb652835.mockapi.io/items').then((res) => {
        return res.json();
      }).then((arr) => {
        setItems(arr);
        setIsLoading(false)
      });
      window.scrollTo(0, 0);
    }, [items]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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