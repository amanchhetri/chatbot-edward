import React, { Component } from 'react';
import './LeadForm.css';

class LeadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: ''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // TODO: add check for name, email and phone

    const userData = { name, email, phone };

    this.props.onSubmit(userData);
  }


  render() { 
    const {name, email, phone} = this.state;
    return (
      <div>
        <p>Sign Up so that we can provide you the best information.</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="email">E-Mail Id</label>  
            <input type="email" name="email" value={email} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="phone">Phone No.</label>
            <input type="number" name="phone" value={phone} onChange={this.handleChange}/>
          </div>
          <div className="submit-button">
            <input type="submit" value="Submit"/>
          </div>
        </form> 
      </div>
    );
  }
}
 
export default LeadForm;