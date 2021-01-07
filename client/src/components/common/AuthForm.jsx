import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import './AuthForm.scss'

const AuthForm = ({handleSubmit, isLoginForm}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="form-container">
            <h1 className="form-headline">{isLoginForm ? 'Log In' : 'Sign Up'}</h1>
            <form className="form-body" onSubmit={handleSubmit}>
                {!isLoginForm && (
                    <input
                        name="name"
                        type="text"
                        placeholder="name"
                        className="form-input"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                )}
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="form-input"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    className="form-input"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button className="submit-button" type="submit">
                    {isLoginForm ? 'Log In' : 'Sign Up'}
                </button>
            </form>
            {isLoginForm ? (
                <p className="form-footer">
                    Don't have an account yet? <Link to={'/signup'}>Sign Up</Link>
                </p>
            ) : (
                <p className="form-footer">
                    Already have an account? <Link to={'/login'}>Log In</Link>
                </p>
            )}
        </div>
    )
}

export default AuthForm
