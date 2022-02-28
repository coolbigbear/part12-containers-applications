import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({
                username, password
            })
            setUsername('')
            setPassword('')
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(setNotification({ notification: 'Successfully logged in', variant: 'success' }, 3))
            dispatch(setUser(user))
        } catch (exception) {
            console.log('Exception at login: ', exception)
            dispatch(setNotification({ notification: 'Wrong credentials', variant: 'danger' }, 3))
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" onChange={({ target }) => setUsername(target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={({ target }) => setPassword(target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                        Submit
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm