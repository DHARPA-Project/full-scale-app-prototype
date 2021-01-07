export const loadUserFromLS = () => {
    try {
        const localData = localStorage.getItem('dharpa')
        if (!localData) return null

        return JSON.parse(localData).user
    } catch (error) {
        console.error('loading user from localStorage failed: ', error)
    }
}

export const saveUserToLS = userData => {
    try {
        let output
        const localData = localStorage.getItem('dharpa')
        if (localData) {
            output = {...JSON.parse(localData), user: userData}
        } else {
            output = {user: userData}
        }
        localStorage.setItem('dharpa', JSON.stringify(output))
    } catch (error) {
        console.error('saving user to localStorage failed: ', error)
    }
}
