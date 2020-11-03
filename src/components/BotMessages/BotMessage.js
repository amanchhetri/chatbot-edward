import React from 'react'
//import './BotMessage.css'

function BotMessage(props) {
    const { botMessages, onClick } = props;

    return (
        <div>
            {botMessages.map(message => {
                const { _id, label } = message;
                return (
                    <div className="bot-links" key={_id}>
                        <span onClick={() => onClick(_id)}>{label}</span>
                    </div>
                );
            })}
        </div>
    );


}

export default BotMessage


// import React from 'react'
// //import './BotMessage.css'

// function BotMessage() {
//     return (
//         <div>
//             <div className="bot-chat">
//                 Hello, dear students my name is Sir Edward 
//             </div>
//             <div className="bot-chat">
//                 your friendly neighborhood scholar
//             </div>
//             <div className="bot-chat">
//                 How may I help you???
//             </div>
//             <div className="bot-links">
//                 Sign me up for next session
//             </div>
//             <div className="bot-links">
//                 I want to learn more about this
//             </div>
//             <div className="bot-links">
//                 I just want to speak to someone
//             </div>
//             <div className="bot-links">
//                 I just want to look around
//             </div>
            
//         </div>
//     )
// }

// export default BotMessage
