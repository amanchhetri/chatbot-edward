import React, { Component } from 'react';
import './LeadForm.css';

const validEmailRegex = RegExp(
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

  // handleValidation() {
  //   let {name, email, phone} = this.state;
  //   let errors = {};
  //   let formValid = true;

  //   if(!name) {
  //     formValid = false
  //     errors['name'] = "Cannot be empty!";
  //   }

  //   if(name.value < 3 ){
  //     formValid = false
  //     errors['name'] = 'Name must be at least 3 characters long!'
  //   }
  //   return formValid;
  // }

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
          value.length < 10
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

    // TODO: add check for name, email and phone
    if(validateForm(this.state.errors)) {
      alert('Valid Form')
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
            <input type="text" name="name" value={name} onChange={this.handleChange} noValidate/>
            {errors.name.length > 0 && 
                <span className='error'>{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="email">E-Mail Id</label>  
            <input type="email" name="email" value={email} onChange={this.handleChange} noValidate/>
            {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="phone">Phone No.</label>
            <input type="number" name="phone" value={phone} onChange={this.handleChange} noValidate/>
            {errors.phone.length > 0 && 
                <span className='error'>{errors.phone}</span>}
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