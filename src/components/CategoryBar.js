import React, { useState } from 'react'
import { Button , Badge} from 'react-bootstrap'
import { capitalizeWord } from "../lib/library";

const CategoryBar = ({categories, filter, setFilter}) => {

    const handleFilter = (category) => {
        console.log(category)
        console.log(filter)

        category !== filter ? setFilter(category) : setFilter('')


    }
    return (
        <div className="mb-3">
            {
                categories.map(category => (
                    <Badge
                        pill
                        variant= {category === filter ? "dark" : "light"}
                        className="btn mr-2"
                        onClick={() =>handleFilter(category)}
                    >
                        {capitalizeWord(category)}
                    </Badge>
                ))
            }
        </div>
    )
}

export default CategoryBar
