import React from 'react'

import {RiDragDropFill} from 'react-icons/ri'

const DragAndDropIcon = ({classes}) => {
    return <RiDragDropFill className={`icon${classes ? ` ${classes}` : ''}`} />
}

export default DragAndDropIcon
