import React, { Component } from 'react';
import './LeadForm.css';

class LeadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      contact: ''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact
    }
    console.log(userData)
  }


  render() { 
    const {name, email, contact} = this.state;
    return (
      <div>
        <p>Sign Up so that we can provide you the best information.</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label for="name">Name</label>
            <input type="text" name="name" value={name} onChange={this.handleChange}/>
          </div>
          <div>
            <label for="email">E-Mail Id</label>  
            <input type="email" name="email" value={email} onChange={this.handleChange}/>
          </div>
          <div>
            <label for="contact">Contact No.</label>
            <input type="number" name="contact" value={contact} onChange={this.handleChange}/>
          </div>
          <div className="submit-button">
            <input type="submit" value="Submit" />
          </div>
        </form> 
      </div>
    );
  }
}
 
export default LeadForm;