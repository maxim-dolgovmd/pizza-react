import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";

import { useState } from "react";
import { AppContext } from "../App";

import { useSelector, useDispatch } from "react-redux";
import {setCategoryId, setCurrentPage} from '../redux/slices/filterSlice'
import axios from "axios";


function Home() {

    const {searchValue} = React.useContext(AppContext)

    const dispatch = useDispatch()
    
    const categoryId = useSelector((state) => state.filterReducer.categoryId)

    const sortType = useSelector((state) => state.filterReducer.sortType)
    const currentPage = useSelector((state) => state.filterReducer.currentPage)

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }


    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    // const [categoryId, setCategoryId] = React.useState(0);
    // const [currentPage, setCurrentPage] = React.useState(1);
    // const [sortType, setSortType] = React.useState({
    //     name: 'популярности',
    //     sortProperty: 'rating',
    // });


    React.useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
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
    }, [categoryId, sortType, searchValue, currentPage])
    

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