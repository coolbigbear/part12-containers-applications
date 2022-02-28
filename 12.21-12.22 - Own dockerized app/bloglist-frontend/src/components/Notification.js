import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <Alert variant={message.variant}>
            {message.notification}
        </Alert>
    )
}

export default Notification