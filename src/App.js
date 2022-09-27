import React from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';


function App() {

  const [items, setItems] = React.useState([]);

    //https://6331b2413ea4956cfb652835.mockapi.io/items

    React.useEffect(() => {
      fetch('https://6331b2413ea4956cfb652835.mockapi.io/items').then((res) => {
        return res.json();
      }).then((arr) => 
      { 
        setItems(arr);
      })
    }, [items]);

  return (
    <div classNameName="App">
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
           {
              items.map((obj) => (
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
      </div>
    </div>
    </div>
  );
}

export default App;
