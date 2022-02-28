import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { clearUser } from '../reducers/userReducer'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Navigation = ({ user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = async () => {
        dispatch(clearUser())
        dispatch(setNotification({ notification: 'Successfully logged out', variant: 'success' }, 3))
        navigate('/')
    }

    return (
        <div>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/">Full Stack Blog App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Blogs</Nav.Link>
                            <Nav.Link href="/users">Users</Nav.Link>
                        </Nav>
                        <Navbar.Text>
                                Signed in as: {user.username}
                        </Navbar.Text>
                        <Button className='m-1' onClick={logOut}>Log out</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation