import React, { Component } from 'react'
import './App.css';
import Message from './components/Message/Message'

// messages = [
//   _id: Optional,
//   message: String,
//   type: Link | "Label",
//   from: "User" | "Bot"
// ]

const messages = [
  {
    _id: '5f9fdbd9951c83251a9c4a19',
    message: "Hello, dear students my name is Sir Edward ",
    type: "label",
    from: "bot"
  },
  {
    _id: '5f9fdbd9951c83251a9c1229',
    message: "your friendly neighborhood scholar ",
    type: "label",
    from: "bot"
  },
  {
    _id: '5f9fdbd9951123251a9c4a39',
    message: "How may I help you??? ",
    type: "label",
    from: "bot"
  },
  {
    _id: '5f9fsad9951c83251a9c4a49',
    message: "Sign me up for next session",
    type: "link"  ,
    from: "bot"
  },
  {
    _id: '5f9fsad9951c83251a9c4a59',
    message: "I want to learn more about this ",
    type: "link"  ,
    from: "bot"
  },
  {
    _id: '5f9fsad9951c83251a9c4a69',
    message: "I just want to speak to someone",
    type: "link"  ,
    from: "bot"
  },
  {
    _id: '5f9fsad9951c83251a9c4a79',
    message: "I just want to look around",
    type: "link"  ,
    from: "bot"
  },
  {
    _id: '5s2fsad9951c83251a9c4a89',
    message: "Hello, I am new here",
    type: "label"  ,
    from: "user"
  }
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      finalMsg: '',
      submitted: false,
      messages
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      finalMsg: this.state.message,
      message: '',
      submitted: true
    })
  }

  handleLinkClick = async (optionId) => {
    const url = `http://localhost:8000/api/widget-chatbot-options/${optionId}`
    const response = await fetch(url);
    const body = await response.json();
    // const widgetChatbotOption =body.widgetChatbotOption;
    // const childOptions = widgetChatbotOption.childOptions || [];
    const { messages: { childOptions = [] } } = body;
    this.setState({ messages: [...this.state.messages, ...childOptions] });
  }

  render() {
    const { messages } = this.state;

    // let userMsg = null;
    // const show = this.state.submitted;
    // if (show) {
    //   userMsg = <UserMessage message={this.state.finalMsg} />
    // }
    return (
      <div className="wrapper">
        <div className="head">
          <h1>Chat with Edward</h1>
        </div>
        {/* <span className="edward-logo" /> */}
        <div className="chat-body">
          <Message messages={messages} onClick={this.handleLinkClick} />
          {/* {userMsg} */}
        </div>
        <form className="inputSubmit" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="inputText"
            placeholder="Enter your text..."
            onChange={this.handleChange}
            value={this.state.message}
            name="message"
          />
          {/* <span onClick={this.handleSubmit} className="send-button" /> */}
        </form>
      </div>
    )
  }

}

export default App