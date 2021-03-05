import React, {useEffect, useRef, useState} from 'react'

import './DragAndDrop.scss'

const defaultModuleGroups = [
    {title: 'group 1', items: ['1', '2', '3']},
    {title: 'group 2', items: ['4', '5']}
]

const defaultModules = ['A', 'B', 'C', 'D', 'E']

const DragAndDrop = () => {
    const dragItem = useRef(null)
    const dragItemNode = useRef(null)

    const [modules, setModules] = useState(defaultModuleGroups)
    const [dragInProgress, setDragInProgress] = useState(false)

    const handleDragStart = (event, item) => {
        console.log('Starting to drag', item)

        dragItemNode.current = event.target
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item

        setTimeout(() => {
            setDragInProgress(true)
        }, 0)
    }

    const handleDragEnter = (event, targetItem) => {
        console.log('Entering a drag target', targetItem)

        if (dragItemNode.current !== event.target) {
            console.log('The target is NOT the same as the dragged item')

            setModules(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetItem.groupIndex].items.splice(
                    targetItem.itemIndex,
                    0,
                    newList[dragItem.current.groupIndex].items.splice(
                        dragItem.current.itemIndex,
                        1
                    )[0]
                )
                dragItem.current = targetItem
                localStorage.setItem('List', JSON.stringify(newList))
                return newList
            })
        }
    }

    const handleDragEnd = e => {
        setDragInProgress(false)
        dragItem.current = null
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null
    }

    const getStyles = item => {
        if (
            dragItem.current.groupIndex === item.groupIndex &&
            dragItem.current.itemIndex === item.itemIndex
        ) {
            return 'dnd-item current'
        }
        return 'dnd-item'
    }

    if (modules) {
        return (
            <div className="drag-n-drop">
                {/* <div className="dnd-group module-pool">
                    {defaultModules.map((mod, ind) => (
                        <div
                            draggable
                            key={mod}
                            onDragStart={event => handleDragStart(event, {groupIndex, ind})}
                            onDragEnter={
                                dragInProgress
                                    ? event => {
                                          handleDragEnter(event, {groupIndex, ind})
                                      }
                                    : null
                            }
                            className={dragInProgress ? getStyles({groupIndex, ind}) : 'dnd-item'}
                        >
                            {mod}
                        </div>
                    ))}
                </div>
                <div className="dnd-group workflow-construction-area"></div> */}

                {modules.map((group, groupIndex) => (
                    <div
                        key={group.title}
                        onDragEnter={
                            dragInProgress && !group.items.length
                                ? e => handleDragEnter(e, {groupIndex, itemIndex: 0})
                                : null
                        }
                        className="dnd-group"
                    >
                        {group.items.map((item, itemIndex) => (
                            <div
                                draggable
                                key={item}
                                onDragStart={event =>
                                    handleDragStart(event, {groupIndex, itemIndex})
                                }
                                onDragEnter={
                                    dragInProgress
                                        ? event => {
                                              handleDragEnter(event, {groupIndex, itemIndex})
                                          }
                                        : null
                                }
                                className={
                                    dragInProgress ? getStyles({groupIndex, itemIndex}) : 'dnd-item'
                                }
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    } else {
        return null
    }
}

export default DragAndDrop
