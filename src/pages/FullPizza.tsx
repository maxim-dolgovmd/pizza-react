import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>()

    const params = useParams()
    const id = params?.id
    console.log(params)

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios(`https://6435d8c48205915d34e74909.mockapi.io/items/${id}`)
                // const data = await responce.json()
                setPizza(data)
            } catch (error) {
                alert('Ошибка, при получении пицц')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])

    console.log(pizza)



    return (
        <div className="container">
            <img src={pizza?.imageUrl} />
            <h1>{pizza?.title}</h1>
            <div>{pizza?.price}</div>
            <button className="button button--outline button--add">
                <Link to={'/'}>
                    <span>Назад</span>
                </Link>
            </button>
        </div>
    )
}

export default FullPizza