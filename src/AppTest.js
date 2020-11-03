import React, { Component } from 'react'
import './App.css';
import BotMessage from './components/BotMessages/BotMessage'
import UserMessage from './components/UserMessages/UserMessage'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      message: '',
      finalMsg: '',
      submitted: false
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
    let userMsg = null;
    const show = this.state.submitted;
    if(show) {
      userMsg = <UserMessage message={this.state.finalMsg} />
    }
    return (
      <div className="wrapper">
        <div className="head">
          <h1>Chat with Edward</h1>
        </div>
        <span className="edward-logo" />
        <div className="chat-body">
          <BotMessage />
          {userMsg}
        </div>
        <form className="inputSubmit" onSubmit={this.handleSubmit}>
          <input type="text" className="inputText" placeholder="Enter your text..." onChange={this.handleChange} 
          value={this.state.message} name="message" />
          <span onClick={this.handleSubmit} className="send-button" />
        </form>
      </div>
    )
  }
}

export default App
