import React, {useContext, useState} from 'react'
import {Redirect} from 'react-router'
import axios from 'axios'

import AuthForm from '../common/AuthForm'

import './RegistrationPage.scss'

import {Context} from '../../context'

const SignUpPage = () => {
    const {createNotification} = useContext(Context)

    const [redirect, setRedirect] = useState(localStorage.getItem('userTokenTime') ? true : false)

    const handleSignUp = async event => {
        event.preventDefault()

        const {name, email, password, confirm} = event.target.elements

        if (password.value !== confirm.value) {
            return createNotification(
                'Passwords do not match', //message
                'error', // type
                10000 // duration (setting to 0 will make it never expire)
            )
        }

        try {
            const {data} = await axios.post(
                '/api/users',
                {
                    name: name.value,
                    email: email.value,
                    password: password.value
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            localStorage.setItem(
                'userTokenTime',
                JSON.stringify({token: data.user.token, time: new Date().getTime()})
            )
            setRedirect(true)
        } catch (error) {
            console.error('registration request failed:')
            console.dir(error)

            const notificationText = error?.response?.data?.message
                ? error.response.data.message
                : error?.message
                ? error.message
                : 'registration failed'
            createNotification(
                notificationText, //message
                'error', // type
                10000 // duration (setting to 0 will make it never expire)
            )
        }
    }

    if (redirect) return <Redirect to="/" />

    return (
        <div className="registration">
            <AuthForm handleSubmit={handleSignUp} isLoginForm={false} />
        </div>
    )
}

export default SignUpPage
