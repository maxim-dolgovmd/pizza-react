import React from "react";
import qs from 'qs'

import {Categories, PizzaBlock, Skeleton, Pagination, SortPopur} from '../components'

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {setCategoryId, setCurrentPage, setFilters, selectFilter, FilterState} from '../redux/slices/filterSlice'
import {setItems, fetchPizzaz, selectPizza, FetchPizzazArgs} from '../redux/slices/pizzaSlice'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from "axios";
import { useAppDispatch } from "../redux/store";
import { selectCart } from "../redux/slices/cartSlice";
// import { list } from "../components/Sort";


const Home:React.FC = () => {

    const dispatch = useAppDispatch()

    const {item, status} = useSelector(selectPizza)
    const {items} = useSelector(selectCart)

    // const isMounted = React.useRef(false)

    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const json = JSON.stringify(items)
    //         console.log(json)
    //         localStorage.setItem('cart', json)
    //     }
    //     isMounted.current = true
    // }, [items])

    const {sortType, currentPage, categoryId, searchValue} = useSelector(selectFilter)
    
    

    const onClickCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }

    const navigate = useNavigate()

    
    const getPizzaz = async () => {

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        
        try {
            dispatch(fetchPizzaz({
                sortBy,
                order,
                category,
                search,
                currentPage,
            }))
        } catch (error) {
            console.log('ERROR', error)
        } 

        window.scrollTo(0, 0)
    }


    React.useEffect(() => {
        getPizzaz()
    }, [categoryId, sortType.sortProperty, searchValue, currentPage])

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <SortPopur value={sortType}/>
            </div>
            {
                status !== 'error' && <h2 className="content__title">Все пиццы</h2>
            }
            <div className="content__items">
                {
                    status === 'error' ? 
                        <div className="content__errors">
                            <h2>
                            Упс, ошибка
                            </h2>
                            <p>
                            Не удалось получить пиццы
                            <br />
                            Зайдите к нам чуть позже
                            </p>
                        </div> :
                    status === 'loading' ? [...new Array(10)].map((_, index) => <Skeleton key={index} />) :
                        // items.filter((obj) => (obj.title).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) 
                        item.map((obj: any) =>
                            <PizzaBlock
                                key={obj?.id}
                                {...obj}
                            />
                        )
                }
            </div>
            {
                status !== 'error' && <Pagination onChangePage={onChangePage}/>
            }
        </>
    )
}

export default Home;