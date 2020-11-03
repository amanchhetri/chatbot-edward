import React, { Component } from 'react'
import './App.css';
import BotMessage from './components/BotMessages/BotMessage'
import UserMessage from './components/UserMessages/UserMessage'

const widgetStartingOptions = [
  {
    _id: "5f9fdbd9951c83251a9c4a79",
    label: "Test1",
    optionInfo: "TestInfo",
    __v: 0,
    createdAt: "2020-11-02T10:13:45.610Z"
  },
  {
    _id: "5f9fdc7d002ee5259ab96d8c",
    label: "Test2",
    optionInfo: "TestInfo2",
    __v: 0,
    createdAt: "2020-11-02T10:16:29.080Z"
  }
];

// messages = [
//   _id: Optional,
//   message: String,
//   type: Link | Label,
//   from: "User" | "Bot"
// ]

const messages = [];



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      finalMsg: '',
      submitted: false,
      // botMessages: widgetStartingOptions,
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

  render() {
    const { botMessages, messages } = this.state;
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
        <span className="edward-logo" />
        <div className="chat-body">
          {/* <BotMessage botMessages={botMessages} onClick={this._handleLinkClick} /> */}
          {/* {userMsg} */}
          <Messages messages={messages} onLinkClick={this._handleLinkClick} />
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
          <span onClick={this.handleSubmit} className="send-button" />
        </form>
      </div>
    )
  }

  _handleLinkClick = async (optionId) => {
    const url = `http://localhost:8000/api/widget-chatbot-options/${optionId}`
    const response = await fetch(url);
    const body = await response.json();
    const { widgetChatbotOption: { childOptions = [] } } = body;
    this.setState({ botMessages: [...this.state.botMessages, ...childOptions] });

  }
}

export default App
