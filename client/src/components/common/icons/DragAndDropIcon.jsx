import React from 'react'

import {IconContext} from 'react-icons'
import {RiDragDropFill} from 'react-icons/ri'

const DragAndDropIcon = () => {
    return (
        <IconContext.Provider value={{color: 'rgba(0, 0, 0, 0.87)'}}>
            <div>
                <RiDragDropFill className="icon" />
            </div>
        </IconContext.Provider>
    )
}

export default DragAndDropIcon
