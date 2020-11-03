import React from 'react'
import './Message.css'

export function Message(props) {
    const { messages = [], onClick } = props;
    return (
        <div>
            {messages.map(msg => {
                const { _id, type, from, message } = msg;

                if (from === "bot") {
                    if (type === "label") {
                        return (<div className="bot-chat" key={_id}>{message}</div>);
                    } else {
                        return (
                            <div className="bot-links" key={_id}>
                                <span onClick={() => onClick(_id)}>{message}</span>
                            </div>
                        );                   
                    }
                } else {
                    return (<div className="user-chat" key={_id}>{message}</div>);
                }
            })}
        </div>
    );
}

// function BotMessage(props) {
//     const { botMessages, onClick } = props;

//     return (
//         <div>
//             {botMessages.map(message => {
//                 const { _id, label } = message;
//                 return (
//                     <div className="bot-links" key={_id}>
//                         <span onClick={() => onClick(_id)}>{label}</span>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

export default Message