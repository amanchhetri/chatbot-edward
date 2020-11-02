import React from 'react'
//import './UserMessage.css'

function UserMessage(props) {
    const {message} = props;
    return <div className="user-chat">{message}</div>
}

export default UserMessage
