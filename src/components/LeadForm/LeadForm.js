import React, { Component } from 'react';
import './LeadForm.css';

const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class LeadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      errors: {
        name: '',
        email: '',
        phone: '',
      }
    }
  }

  handleChange = (event) => {
    //this.setState({[e.target.name]: e.target.value})
    const {name, value} = event.target;
    let {errors} = this.state;

    switch (name) {
      case 'name': 
        errors.name = 
          value.length < 3
            ? 'Name must be at least 3 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'phone': 
        errors.phone = 
          value.length < 10 || value.length > 10
            ? 'Phone number is not valid!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // const { name, email, phone } = this.state;
    if(validateForm(this.state.errors)) {
      alert('Valid Form')
      const { name, email, phone } = this.state;
      const userData = { name, email, phone };
      this.props.onSubmit(userData);
    }else{
      alert('Invalid Form')
    }

    // const userData = { name, email, phone };

    // this.props.onSubmit(userData);
  }


  render() { 
    const {name, email, phone, errors} = this.state;
    return (
      <div>
        <p>Sign Up so that we can provide you the best information.</p>
        <form onSubmit={this.handleSubmit} noValidate>
          <div>
            <label htmlFor="name">Name</label>
            {errors.name.length > 0 && <span className='error'>{errors.name}</span>}
            <input type="text" name="name" value={name} onChange={this.handleChange} autoComplete="off" noValidate/>
          </div>
          <div>
            <label htmlFor="email">E-Mail Id</label>  
            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
            <input type="email" name="email" value={email} onChange={this.handleChange} autoComplete="off" noValidate/>
          </div>
          <div>
            <label htmlFor="phone">Phone No.</label>
            {errors.phone.length > 0 && <span className='error'>{errors.phone}</span>}
            <input type="number" className="phone" name="phone" value={phone} onChange={this.handleChange} autoComplete="off" noValidate/>            
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