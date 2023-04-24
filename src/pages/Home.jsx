import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";

import { useState } from "react";


const Home = ({
    searchValue
}) => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating',
    });

    React.useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://6435d8c48205915d34e74909.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((json) => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue])
    // console.log(items)

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
                <Sort type={sortType} onclickSort={(id) => setSortType(id)} />
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
            <Pagination />
        </>
    )
}

export default Home;