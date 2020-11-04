import React, { useEffect, useState } from 'react'
import './Message.css'

export function Message(props) {
    const { messages = [], onClick, showBotTyping = false } = props;
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
            {showBotTyping && <BotTyping />}
        </div>
    );
}

function useDots(initialDots = 1, duration = 500) {
    const [dots, setDots] = useState(initialDots);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            dots > 2 ? setDots(1) : setDots(dots + 1);
        }, duration);

        return () => clearInterval(intervalId);
    }, [dots]);
    
    return [dots];
}

function BotTyping() {

    const [dots] = useDots();

    const renderDots = () => {
        if (dots === 3) return ("...");
        if (dots === 2) return ("..");
        if (dots === 1) return (".");
        return "";
    }

    return (
        <div className="bot-chat">
            <span style={{ letterSpacing: 5, fontSize: 16 }}>&nbsp;{renderDots()} </span>
        </div>
    );
}

export default Message