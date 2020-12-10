import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import FormMessage from './FormMessage'
import isEmail from 'validator/lib/isEmail'
import setFormObject from "./FormUtils";

const initialData = {
    email: '',
    password: '',
    passwordConfirmation: '',
}

const SignupForm = props => {
    const [data, setData] = useState(initialData)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const cls = isLoading ? 'ui form loading': 'ui form'

    const handleSubmit = e => {
        e.preventDefault()
        const errors = validate(data)
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            setIsLoading(true)
            props
                .submit(data)
                .catch(error => {
                    setErrors(error.response.data.errors)
                    setIsLoading(false)
                })
        }
    }

    const validate = data => {
        const errors = {}

        if (!data.email) errors.email = 'Email cannot be blank'
        if (!isEmail(data.email)) errors.email = 'Wrong email format'
        if (!data.password) errors.password = 'Password cannot be blank'
        if (!data.passwordConfirmation) errors.passwordConfirmation = 'Password cannot be blank'
        if (data.password !== data.passwordConfirmation) errors.password = 'password and confirmation should match'

        return errors
    }

    return (
        <form className={cls} onSubmit={handleSubmit}>
            <div className={errors.email ? "error field" : "field"}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={setFormObject(data, setData)}
                />
                <FormMessage>{errors.email}</FormMessage>
            </div>

            <div className={errors.password ? "error field" : "field"}>
                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={data.password}
                    onChange={setFormObject(data, setData)}
                />
                <FormMessage>{errors.password}</FormMessage>
            </div>

            <div className={errors.passwordConfirmation ? "error field" : "field"}>
                <label>Password Confirmation</label>
                <input
                    type="text"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    placeholder="password confirmation"
                    value={data.passwordConfirmation}
                    onChange={setFormObject(data, setData)}
                />
                <FormMessage>{errors.passwordConfirmation}</FormMessage>
            </div>

            <div className="ui fluid buttons">
                <button className="ui button primary">Sing Up</button>

                <div className="or" />

                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </div>
        </form>
    )
}

export default SignupForm
