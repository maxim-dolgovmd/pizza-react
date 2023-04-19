
import React, {useState} from "react"

function Categories({
    value,
    onClickCategory
}) {

    const categories =[
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    // const clickActive = (index) => {
    //     setActiveCategories(index)
    // }

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (

                    <li
                        key={index} 
                        onClick={() => onClickCategory(index)} 
                        className={value === index ? 'active' : ''}>
                        {categoryName}
                    </li>

                ))}
            </ul>
        </div>
    )
}

export default Categories

