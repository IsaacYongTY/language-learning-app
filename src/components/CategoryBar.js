import React, { useState } from 'react'
import { Button , Badge} from 'react-bootstrap'
import { capitalizeWord } from "../lib/library";

const CategoryBar = ({categories, filter, setFilter}) => {

    const handleFilter = (category) => {
        console.log(category)
        setFilter(category)


    }
    return (
        <div>
            {
                categories.map(category => (
                    <Badge
                        pill
                        variant= {category === filter ? "dark" : "light"}
                        className="btn"
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
