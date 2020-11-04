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

  state = {
    userMessage: '',
    messages: INIT_MESSAGES,
    showLeadForm: false,
    selectedOptionId: null,
    showBotTyping: false
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { messages, userMessage } = this.state;
    const newMessage = [...messages, { message: userMessage, type: "label", from: "user" }];
    this.setState({ messages: newMessage, userMessage: '' });
  }

  handleLinkClick = (optionId) => {
    if (!this.isLeadTaken) {
      this.isLeadTaken = true;
      this.setState({ showLeadForm: true, selectedOptionId: optionId });
    }
    else {
      this.fetchChildOptions(optionId);
    }
  }

  handleLeadFormSubmit = async (userData) => {
    this.setState({ showLeadForm: false });
    await this.sendLeadFormData(userData);
    this.fetchChildOptions(this.state.selectedOptionId);
  }

  render() {
    const { userMessage = "" } = this.state;
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
            value={userMessage}
            name="message"
            placeholder="Ask question here"
          />
          {/* <span onClick={this.handleSubmit} className="send-button" /> */}
        </form>
      </div>
    )
  }

  _getScreen = () => {
    const { showLeadForm, messages, showBotTyping } = this.state;
    if (showLeadForm) {
      return (<LeadForm onSubmit={this.handleLeadFormSubmit} />);
    }
    return (
      <Message
        messages={messages}
        onClick={this.handleLinkClick}
        showBotTyping={showBotTyping}
      />
    );
  }

  fetchChildOptions = async (optionId) => {
    this.setState({ showBotTyping: true }, () => scrollToBottom("messages_div"));
    try {
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

      const newState = {
        showBotTyping: false, messages: [...this.state.messages, ...formatedMessages]
      };

      await delay(5000);

      this.setState(newState, async () => {
        await delay(1);
        scrollToBottom("messages_div");
      });
    }
    catch (error) {
      console.log("error", error);
      this.setState({ showBotTyping: false });
    }
  }

  sendLeadFormData = async (userData) => {
    try {
      const url = "";
      const response = await fetch(url, { method: "POST" });
      const body = await response.json();
    }
    catch (error) {
      console.log("sendLeadFormData", error);
    }
    return true;
  }

}

export default App;

function scrollToBottom(id) {
  var div = document.getElementById(id);
  if (div) div.scrollTop = div.scrollHeight - div.clientHeight;
}

const delay = duration => new Promise(r => setTimeout(r, duration));
