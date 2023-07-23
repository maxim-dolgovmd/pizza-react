import React from "react";
import qs from 'qs'

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {setCategoryId, setCurrentPage, setFilters, selectFilter, FilterState} from '../redux/slices/filterSlice'
import {setItems, fetchPizzaz, selectPizza, FetchPizzazArgs} from '../redux/slices/pizzaSlice'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from "axios";
import { useAppDispatch } from "../redux/store";
import SortPopur from "../components/Sort";
// import { list } from "../components/Sort";


const Home:React.FC = () => {

    const dispatch = useAppDispatch()

    const {items, status} = useSelector(selectPizza)

    const {sortType, currentPage, categoryId, searchValue} = useSelector(selectFilter)
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const onClickCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (number: number) => {
        dispatch(setCurrentPage(number))
    }

    // const [isLoading, setIsLoading] = React.useState(true)

    const navigate = useNavigate()

    
    const getPizzaz = async () => {
        // setIsLoading(true)

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


    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sortType.sortProperty,
    //             categoryId,
    //             currentPage,
    //         });
    //         navigate(`?${queryString}`)
    //     }
    //     if (!window.location.search) {
    //         dispatch(fetchPizzaz({} as FetchPizzazArgs))
    //     }
    //     // isMounted.current = true
    // }, [categoryId, sortType.sortProperty, currentPage]);


    React.useEffect(() => {
        getPizzaz()
    }, [categoryId, sortType.sortProperty, searchValue, currentPage])


    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1)) as unknown as FetchPizzazArgs
    //         // console.log(params)
    //         const sort = list.find((obj) => obj.sortProperty === params.sortBy)
           
    //         dispatch(setFilters({
    //             searchValue: params.search,
    //             categoryId: Number(params.category),
    //             currentPage: params.currentPage,
    //             sortType: sort ? sort : list[0] 
    //         }))
    //     }
    //     isSearch.current = true
    // }, [])


    
    // let num = 1122423335566
    // let numString = String(num)
    // const splitNum = numString.split('')
    // console.log(splitNum)
    // const reduceNum = splitNum.reduce((acc, obj) => acc === obj, '')
    // const funcItem = (num) => {
    //     num = [String(num)]
    //     let res = {}
    //     for (let i = 0; i < num.length; i++) {
    //         if (res[num[i]]) {
    //             res[num[i]]++
    //         } else {
    //             res[num[i]] = 1
    //         }
    //     }
    //     return res
    // }
    // // const findNum = splitNum.find((obj) => Number(obj) === )
    // console.log(funcItem(num))

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
                        items.map((obj: any) =>
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