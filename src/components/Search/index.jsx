import React from 'react';
import styles from './Search.module.scss'; 
import { SearchContext } from '../../App';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';


const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.fucus()
  };
  
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 150),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  return (
    <div className={styles.root}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
        <g data-name="Layer 2" id="Layer_2">
          <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы...."
        type="text" />
      {value && <span
      onClick={onClickClear}
      className={styles.close}>
      &#128711;
      </span>}
    </div>
  )
}
export default Search;