import React from 'react'
import './Message.css'

export function Message(props) {
    const { messages = [], onClick } = props;
    const timestamp = Date.now();

    return (
        <div>
            {messages.map((msg, index) => {
                const { _id, type, from, message } = msg;
                const key = _id + timestamp + index;
                if (from === "bot") {
                    if (type === "label") {
                        return (<div className="bot-chat" key={key}>{message}</div>);
                    } else {
                        return (
                            <div className="bot-links" key={key}>
                                <span onClick={() => onClick(_id)}>{message}</span>
                            </div>
                        );                   
                    }
                } else {
                    return (<div className="user-chat" key={key}>{message}</div>);
                }
            })}
        </div>
    );
}

export default Message