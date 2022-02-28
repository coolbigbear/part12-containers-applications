import React, { useEffect } from 'react'
import decode from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { initializeUsers } from '../reducers/usersReducer'

const Blog = ({ blog }) => {

    console.log('Blog received: ', blog)
    const history = useNavigate()

    const [blogOwner, setblogOwner] = useState(null)
    const [newComment, setnewComment] = useState('')
    const user = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        let userDecodedToken = decode(user.token)
        user.id = userDecodedToken.id
        if (blog) {
            setblogOwner(blog.user.id || blog.user)
        }
    }, [blog])


    const handleLikeBlog = () => {
        dispatch(likeBlog({ ...blog }))
        dispatch(setNotification({ notification: `Blog: ${blog.title} liked`, variant: 'success' }, 3))
    }

    const handleDeleteBlog = () => {
        if (window.confirm(`Do you want to delete ${blog.title}?`)) {
            dispatch(deleteBlog({
                id: blog.id
            }))
            dispatch(initializeUsers())
            dispatch(setNotification({ notification: 'Blog deleted', variant: 'warning' }, 3))
            history('/')
        }
    }

    const handleAddComment = (event) => {
        event.preventDefault()
        console.log('event: ',event)
        dispatch(addComment(blog.id, newComment))
        dispatch(setNotification({ notification: `Comment: ${newComment} added`, variant: 'success' }, 3))
        setnewComment('')
    }

    if (blog) {
        return (
            <div className="blog">
                <h4>{blog.title}</h4>
                <p>{blog.author}</p>
                <p>{blog.url}</p>
                <p>likes {blog.likes} <Button onClick={handleLikeBlog}>like</Button></p>
                <p>created by: <Link to={`/user/${blog.user.id}`}>{blog.user.username}</Link></p>
                {blogOwner === user.id &&
                    <Button onClick={handleDeleteBlog}>Delete</Button>
                }
                <h4>comments</h4>
                <Form onSubmit={handleAddComment}>
                    <Form.Group className="mb-3" controlId="newComment">
                        <Form.Control value={newComment} type="comment" placeholder='new comment' onChange={({ target }) => setnewComment(target.value)}/>
                    </Form.Group>
                    <Button type='submit' className='mb-3'>add comment</Button>
                </Form>
                <ListGroup>
                    {blog.comments
                        .map(comment =>
                            <ListGroup.Item key={comment.id}>{comment.comment}</ListGroup.Item>
                        )}
                </ListGroup>
            </div>
        )
    } else {
        return null
    }
}

export default Blog