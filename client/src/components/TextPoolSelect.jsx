import React, {useRef} from 'react'
import PropTypes from 'prop-types'

import './TextPoolSelect.scss'

import Spinner from './common/Spinner'

const TextPoolSelect = ({textPools, selectedTextPool, handleTextPoolSelect}) => {
    const selectRef = useRef(null)

    if (!textPools.length) return <Spinner />

    return (
        <div className="text-pool-choice">
            <select
                className="text-pool-choice-select"
                ref={selectRef}
                autoFocus={!selectedTextPool}
                name="text-pools"
                id="text-pools"
                onChange={event => {
                    selectRef.current.blur()
                    handleTextPoolSelect(event)
                }}
                defaultValue={selectedTextPool}
            >
                <option value=""> -- select a previously uploaded text pool -- </option>
                {textPools.map(pool => (
                    <option key={pool.id} value={pool.id}>
                        {pool.title ? pool.title : pool.id}
                    </option>
                ))}
            </select>
        </div>
    )
}

TextPoolSelect.propTypes = {
    textPools: PropTypes.array.isRequired
}

TextPoolSelect.defaultProps = {}

export default TextPoolSelect
