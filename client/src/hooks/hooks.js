import {useEffect, useRef, useState} from 'react'

export const useWiggle = () => {
    const wiggleRef = useRef(null)

    const [wiggle, setWiggle] = useState(false)

    useEffect(() => {
        if (wiggle) {
            wiggleRef.current.classList.add('wiggle')
            wiggleRef.current.addEventListener('animationend', () => {
                wiggleRef.current.classList.remove('wiggle')
            })
            setWiggle(false)
        }

        return () =>
            wiggleRef.current.removeEventListener('animationend', () => {
                // eslint-disable-next-line
                wiggleRef.current.classList.remove('wiggle')
            })
    }, [wiggle])

    return [wiggleRef, setWiggle]
}
