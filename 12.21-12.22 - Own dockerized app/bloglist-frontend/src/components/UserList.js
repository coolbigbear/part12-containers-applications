import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const UserList = ({ users }) => {

    console.log('user list: ', users)

    if (users) {
        return (
            <div>
                <h2>Users</h2>
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .sort((a, b) => b.blogs.length - a.blogs.length)
                            .map(user =>
                                <tr key={user.id}>
                                    <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                                    <td>{user.blogs.length}</td>
                                </tr>
                            )}
                    </tbody>
                </Table>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default UserList