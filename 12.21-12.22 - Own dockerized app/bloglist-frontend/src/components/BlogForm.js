import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { initializeUsers } from '../reducers/usersReducer'

const BlogForm = ({ toggleBlogFormVisibility, user }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')

    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        dispatch(createBlog({
            title: newTitle,
            author: newAuthor,
            url: newURL,
        }, user))

        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
        dispatch(initializeUsers())
        dispatch(setNotification({ notification: 'Blog created', variant: 'success' }, 3))
        toggleBlogFormVisibility()
    }


    return (
        <div className='m-1'>
            <h2>Create a new blog</h2>
            <Form onSubmit={addBlog}>
                <Form.Group className='mb-3' controlId='newBlogTitle'>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="title" placeholder="title" onChange={({ target }) => setNewTitle(target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='newBlogAuthor'>
                    <Form.Label>Author:</Form.Label>
                    <Form.Control type="author" placeholder="author" onChange={({ target }) => setNewAuthor(target.value)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='newBlogUrl'>
                    <Form.Label>URL:</Form.Label>
                    <Form.Control type="url" placeholder="url" onChange={({ target }) => setNewURL(target.value)} />
                </Form.Group>
                <Button onClick={addBlog}>Add Blog</Button>
            </Form>
        </div>
    )
}


export default BlogForm