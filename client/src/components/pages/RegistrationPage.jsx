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

        if (!name.value || !email.value || !password.value || !confirm.value) {
            return createNotification(
                'To register, please fill out all the fields!', //message
                'error', // type
                10000 // duration (setting to 0 will make it never expire)
            )
        }

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

            const getNotificationText = () => {
                if (
                    error?.response?.data?.message?.message &&
                    typeof error.response.data.message.message === 'string'
                ) {
                    return error.response.data.message.message
                } else if (error?.message && typeof error.message === 'string') {
                    return error.message
                } else {
                    return 'registration failed'
                }
            }

            createNotification(
                getNotificationText(), //message
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
