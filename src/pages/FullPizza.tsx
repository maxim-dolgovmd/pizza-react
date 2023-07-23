import axios from "axios";
import React, { useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom'

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>()

    const params = useParams()
    const id = params?.id

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios(`https://6435d8c48205915d34e74909.mockapi.io/items/${id}`)
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
       </div>
    )
}

export default FullPizza