import React from "react"
import { useState } from "react"

import {CartItem, selectCart, selectCartItemById, setItem} from '../../redux/slices/cartSlice'
import { useSelector,  useDispatch} from "react-redux"
import { Link } from "react-router-dom"
import { addCountCard } from "../../utils/addCountCard"
import { selectPizza } from "../../redux/slices/pizzaSlice"
import { getCartFromLockalStorage } from "../../utils/getCartFromLockalStorage"

type PizzaProps = {
   id: string,
   title: string,
   price: number,
   imageUrl: string,
   types: number[],
   sizes: number[],
}
const PizzaBlock: React.FC<PizzaProps> = ({
    id,
    title,
    price,
    imageUrl,
    types,
    sizes,
}) => {
    const [activeSizes, setActiveSizes] = React.useState(0)
    const [activeTypes, setActiveTypes] = React.useState(0)
    const dispatch = useDispatch()
    
    const {items} = useSelector(selectCart)


    const typeNames = [
        'тонкое',
        'традиционное',
    ]

    const onClickAdd = () => {
        const item: CartItem = {
            id,
            title,
            price,
            imageUrl,
            type: typeNames[activeTypes],
            sizes: sizes[activeSizes],
            count: 0,
        }
        dispatch(setItem(item))
    }

    const itemCount = {
        id,
        type: typeNames[activeTypes],
        sizes: sizes[activeSizes],
    }

    const cartItem = useSelector(selectCartItemById(itemCount))

    const addedCount = cartItem && cartItem.count

    console.log(cartItem)


    return (

        <div className="pizza-block-wrapper">
            <div className="pizza-block" >
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                </Link>
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveTypes(index)}
                                className={activeTypes === index ? "active" : ''}>
                                {typeNames[type]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {sizes.map((size, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveSizes(index)}
                                className={activeSizes === index ? "active" : ''}>
                                {size} см.
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <button className="button button--outline button--add">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                fill="white"
                            />
                        </svg>
                        <span onClick={onClickAdd}>Добавить</span>
                        {
                            addedCount  &&
                                <i>{addedCount}</i>
                        }
                        {/* {
                            count
                        } */}
                    </button>
                </div>
            </div >
        </div>
    )
}

export default PizzaBlock