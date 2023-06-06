import React from "react";
import qs from 'qs'

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";
import { initialState } from "../redux/slices/filterSlice";

import { useState } from "react";
import { AppContext } from "../App";

import { useSelector, useDispatch } from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from '../redux/slices/filterSlice'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
// import { list } from "../components/Sort";


function Home() {

    const {searchValue} = React.useContext(AppContext)

    const dispatch = useDispatch()
    
    const categoryId = useSelector((state) => state.filterReducer.categoryId)

    const sortType = useSelector((state) => state.filterReducer.sortType)
    const currentPage = useSelector((state) => state.filterReducer.currentPage)
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    // const filtersParse = (obj) => {
    //     dispatch(setFilters(obj))
    // }


    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const navigate = useNavigate()

    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(
            `https://6435d8c48205915d34e74909.mockapi.io/items?&page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then((res) => {
            setItems(res.data)
                setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }, [categoryId, sortType.sortProperty, searchValue, currentPage])


    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType.sortProperty, currentPage]);


    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            // console.log(params)
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params, sort,
                })
            )
            isSearch.current = true
        }
    }, [])
    

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(10)].map((_, index) => <Skeleton key={index} />) :
                        // items.filter((obj) => (obj.title).toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) 
                        items.map((obj) =>
                            <PizzaBlock
                                key={obj?.id}
                                {...obj}
                            />
                        )
                }
            </div>
            <Pagination onChangePage={onChangePage}/>
        </>
    )
}

export default Home;