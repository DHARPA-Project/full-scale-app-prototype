import React, {useContext} from 'react'
import axios from 'axios'

import AuthForm from '../common/AuthForm'

import './RegistrationPage.scss'

import {Context} from '../../context'

const SignUpPage = () => {
    const {saveLoggedInUser, createNotification} = useContext(Context)

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

            saveLoggedInUser(data.user)
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

    return (
        <div className="registration">
            <AuthForm handleSubmit={handleSignUp} isLoginForm={false} />
        </div>
    )
}

export default SignUpPage
