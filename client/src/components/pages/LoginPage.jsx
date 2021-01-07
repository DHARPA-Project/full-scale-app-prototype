import React, {useContext} from 'react'
import axios from 'axios'

import AuthForm from '../common/AuthForm'

import './LoginPage.scss'

import {Context} from '../../context'

const LoginPage = () => {
    const {saveLoggedInUser, createNotification} = useContext(Context)

    const handleLogin = async event => {
        event.preventDefault()

        const {email, password} = event.target.elements

        try {
            const {data} = await axios.post(
                '/api/users/login',
                {
                    email: email.value,
                    password: password.value
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            saveLoggedInUser(data.user)
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
                10000 // duration (setting to 0 will make it never expire)
            )
        }
    }

    return (
        <div className="login">
            <AuthForm handleSubmit={handleLogin} isLoginForm={true} />
        </div>
    )
}

export default LoginPage
