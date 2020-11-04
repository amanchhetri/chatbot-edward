import React, { useState } from 'react';
import './LeadForm.css';

// const validEmailRegex = RegExp(
//   // eslint-disable-next-line
//   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// );
// const validateForm = errors => {
//   let valid = true;
//   Object.values(errors).forEach(val => val.length > 0 && (valid = false));
//   return valid;
// };

function LeadForm(props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  })

  //const handleChange = (e) => {
    // const {name, value} = event.target;
    // let {errors} = this.state;

    // switch (name) {
    //   case 'name': 
    //     errors.name = 
    //       value.length < 3
    //         ? 'Name must be at least 3 characters long!'
    //         : '';
    //     break;
    //   case 'email': 
    //     errors.email = 
    //       validEmailRegex.test(value)
    //         ? ''
    //         : 'Email is not valid!';
    //     break;
    //   case 'phone': 
    //     errors.phone = 
    //       value.length < 10 || value.length > 10
    //         ? 'Phone number is not valid!'
    //         : '';
    //     break;
    //   default:
    //     break;
    // }

    // this.setState({errors, [name]: value});
  //}

 const handleSubmit = (e) => {
    e.preventDefault();

    // if(validateForm(this.state.errors)) {
    //   alert('Valid Form')

      //const { name, email, phone } = this.state;
      const userData = { name, email, phone };
      props.onSubmit(userData);
    // }else{
    //   alert('Invalid Form')
    // }
  }

    return (
      <div>
        <p>Sign Up so that we can provide you the best information.</p>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name">Name</label>
            {errors.name.length > 0 && <span className='error'>{errors.name}</span>}
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} autoComplete="off" noValidate/>
          </div>
          <div>
            <label htmlFor="email">Email</label>  
            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" noValidate/>
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            {errors.phone.length > 0 && <span className='error'>{errors.phone}</span>}
            <input type="number" className="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="off" noValidate/>            
          </div>
          <div className="submit-button">
            <input type="submit" value="Submit"/>
          </div>
        </form> 
      </div>
    );
}
 
export default LeadForm;