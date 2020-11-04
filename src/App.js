import React, { Component } from 'react'
import './App.css';
import Message from './components/Message/Message';
import LeadForm from './components/LeadForm/LeadForm';

const INIT_MESSAGES = [
  {
    _id: '5f9fdbd9951c83251a9c4a19_info',
    message: "Hello, dear students",
    type: "label",
    from: "bot"
  },
  {
    _id: '5fa112713cdb458f948d63c0',
    message: "Sign me up for next session",
    type: "link",
    from: "bot"
  },
  {
    _id: '5f9fsad9951c83251a9c4a59',
    message: "I want to learn more about this ",
    type: "link",
    from: "bot"
  },
  {
    _id: '5f9fsad9951c83251a9c4a69',
    message: "I just want to speak to someone",
    type: "link",
    from: "bot"
  },
  {
    _id: '5f9fsad9951c83251a9c4a79',
    message: "I just want to look around",
    type: "link",
    from: "bot"
  },
  {
    _id: '5f9fsad9951c83251a9c4a89',
    message: "Hello, I am new here",
    type: "label",
    from: "user"
  }
];

class App extends Component {

  isLeadTaken = false;

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      finalMsg: '',
      submitted: false,
      messages: INIT_MESSAGES,
      showLeadForm: false,
      selectedOptionId: null
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

  handleLinkClick = (optionId) => {
    if (!this.isLeadTaken) {
      this.isLeadTaken = true;
      // save optionsId Here
      this.setState({ showLeadForm: true, selectedOptionId: optionId });
    }
    else {
      this.fetchChildOptions(optionId);
    }
  }

  handleLeadFormSubmit = (userData) => {
    this.setState({ showLeadForm: false });
    console.log("userData", userData);
    // SKiping userData saving
    const { selectedOptionId } = this.state;
    this.fetchChildOptions(selectedOptionId);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="head">
          <h1>Chat with Staff</h1>
        </div>
        <div className="chat-body" id="messages_div">
          {this._getScreen()}
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

  _getScreen = () => {
    const { showLeadForm, messages } = this.state;
    if (showLeadForm) {
      return (<LeadForm onSubmit={this.handleLeadFormSubmit} />);
    }
    return <Message messages={messages} onClick={this.handleLinkClick} />;
  }

  fetchChildOptions = async (optionId) => {
    if (!optionId) {
      // TODO: show error msg
      return null;
    }

    const url = `http://localhost:8000/api/widget-chatbot-options/${optionId}`
    const response = await fetch(url);
    const body = await response.json();
    const { option } = body;

    const { _id, optionInfo, childOptions } = option;

    let formatedMessages = [];

    if (optionInfo) {
      formatedMessages.push({
        _id, message: optionInfo, type: "label", from: "bot"
      });
    }

    childOptions.forEach(item => {
      const { _id, label } = item;
      if (label) {
        formatedMessages.push({
          _id, message: label, type: "link", from: "bot"
        });
      }
    });

    this.setState({ messages: [...this.state.messages, ...formatedMessages] }, () => {
      setTimeout(() => scrollToBottom("messages_div"), 0);
    });
  }

}

export default App;

function scrollToBottom (id) {
  var div = document.getElementById(id);
  if (div) div.scrollTop = div.scrollHeight - div.clientHeight;
}