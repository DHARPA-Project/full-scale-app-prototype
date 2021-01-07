import React, {useContext, useState} from 'react'
import {Redirect} from 'react-router'
import axios from 'axios'

import AuthForm from '../common/AuthForm'

import './LoginPage.scss'

import {Context} from '../../context'

const LoginPage = () => {
    const {createNotification} = useContext(Context)

    const [token, setToken] = useState('')
    const [redirect, setRedirect] = useState(localStorage.getItem('userTokenTime') ? true : false)

    const handleLogin = async event => {
        event.preventDefault()

        const {email, password} = event.target.elements

        try {
            const {data} = await axios.post('/api/users/login', {
                email: email.value,
                password: password.value
            })

            setToken(data.token)
            localStorage.setItem(
                'userTokenTime',
                JSON.stringify({token, time: new Date().getTime()})
            )
            setRedirect(true)
        } catch (error) {
            console.error('login request failed:')
            console.dir(error)

            const notificationText = error?.response?.data?.message
                ? error.response.data.message
                : error?.message
                ? error.message
                : 'login failed'
            createNotification(
                notificationText, //message
                'error', // type
                5000 // duration (setting to 0 will make it never expire)
            )
        }
    }

    if (redirect) return <Redirect to="/" />

    return (
        <div className="login">
            <AuthForm handleSubmit={handleLogin} isLoginForm={true} />
        </div>
    )
}

export default LoginPage
