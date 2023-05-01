import React from 'react'

import styles from './Search.module.scss'

import { AppContext } from '../../App'

function Search() {

  const {searchValue, setSearchValue} = React.useContext(AppContext)
  console.log('перерисовка search')

  return (
    <div className={styles.root}>
        <svg className={styles.searchImg} data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/><path d="M127.11,122.87l-48.45-48A45,45,0,0,0,45,0,44.7,44.7,0,0,0,13.18,13.18h0A45,45,0,0,0,45,90,44.65,44.65,0,0,0,74.38,79.07l48.51,48.06a3,3,0,1,0,4.22-4.26ZM17.42,72.58a39,39,0,0,1,0-55.15h0A39,39,0,1,1,72.58,72.58a39,39,0,0,1-55.15,0Z"/></svg>
        <input 
          value={searchValue} 
          onChange={(event) => setSearchValue(event.target.value)} 
          className={styles.input} 
          placeholder='Поиск' 
        />
        {searchValue && <svg onClick={() => setSearchValue('')} className={styles.clearImg} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/><path d="M0 0h48v48H0z" fill="none"/></svg>}
    </div>
  )
}

export default Search
