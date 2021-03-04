import React, { useState } from 'react'
import { Button , Badge} from 'react-bootstrap'
import {capitalizeWord} from "../lib/library";

const CategoryBar = ({categories}) => {

    return (
        <div>
            {
                categories.map(category => (
                    <Badge
                        pill
                        variant="light"
                        className="btn"
                        onClick={() => console.log('clicked')}
                    >
                        {capitalizeWord(category)}
                    </Badge>
                ))
            }


        </div>
    )
}

export default CategoryBar
