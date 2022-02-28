import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Navigation from './components/Navigation'
import {
    Routes, Route, useMatch
} from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import User from './components/User'

const App = () => {

    let dispatch = useDispatch()

    const notification = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)

    const blogFormRef = useRef()

    console.log(`${ process.env.BACKEND_URL}`)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])

    const  toggleBlogFormVisibility = () => {
        blogFormRef.current.toggleVisibility()
    }

    let blogMatch = useMatch('/blog/:id')
    blogMatch = blogMatch
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null

    let userMatch = useMatch('/user/:id')
    userMatch = userMatch
        ? users.find(user => user.id === userMatch.params.id)
        : null

    if (user === null) {
        return (
            <div>
                <Notification message={notification} />
                <LoginForm setUser={setUser} />
            </div>
        )
    } else {
        return (
            <div>
                <Navigation user={user}></Navigation>
                <Notification message={notification} />
                <Routes>
                    <Route path='blog/:id' element={<Blog blog={blogMatch} user={user}></Blog>}/>
                    <Route path='user/:id' element={<User user={userMatch}/>}/>
                    <Route path='users' element={<UserList users={users}/>} />
                    <Route path='/' element={
                        <div>
                            <h2>Blogs</h2>
                            <Togglable buttonLabel='create new' ref={blogFormRef}>
                                <BlogForm toggleBlogFormVisibility={toggleBlogFormVisibility} user={user} />
                            </Togglable>
                            <BlogList blogs={blogs}user={user} />
                        </div>
                    } />
                </Routes>
            </div>
        )
    }
}

export default App