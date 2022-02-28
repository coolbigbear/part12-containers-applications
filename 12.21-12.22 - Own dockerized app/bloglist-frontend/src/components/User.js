import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

const User = ({ user }) => {

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.username}</h2>
            <h3>added blogs:</h3>
            <ListGroup>
                {user.blogs
                    .map(blog =>
                        <ListGroup.Item key={blog.id}><Link to={`/blog/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
                    )
                }
            </ListGroup>
        </div>
    )
}

export default User