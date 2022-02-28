import React from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const BlogList = ({ blogs }) => {

    return (
        <div>
            <ListGroup>
                {blogs
                    .sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))
                    .map(blog =>
                        <ListGroup.Item
                            key={blog.id}><Link to={`/blog/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
                    )}
            </ListGroup>
        </div>
    )
}

export default BlogList