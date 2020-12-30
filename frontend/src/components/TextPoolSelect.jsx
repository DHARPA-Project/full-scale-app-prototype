import React from 'react'
import PropTypes from 'prop-types'

import './TextPoolSelect.scss'

import Spinner from './common/Spinner'

const TextPoolSelect = ({textPools}) => {
    if (!textPools.length) return <Spinner />

    return (
        <div className="text-pool-choice">
            {/* <label className="text-pool-choice-label" htmlFor="text-pools">
                Choose one of the previously uploaded text pools
            </label> */}
            <select
                className="text-pool-choice-select"
                autoFocus
                name="text-pools"
                id="text-pools"
                onChange={event => console.log(event.target)}
            >
                <option> -- select a previously uploaded text pool -- </option>
                {textPools.map(pool => (
                    <option key={pool.id} value={pool.id}>{`${pool.name} - ${pool.date}`}</option>
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
