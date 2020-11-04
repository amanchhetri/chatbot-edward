import React from 'react';
import { useForm } from 'react-hook-form';
import './LeadForm.css';

function LeadForm(props) {
  const { handleSubmit, register, errors, formState: { isSubmitting } } = useForm();

  const onSubmit = userData => props.onSubmit(userData);

  return (
    <div>
      <p>Sign Up so that we can provide you the best information.</p>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <label>Name</label>
          {errors.name && errors.name.type === "required" && <span className="error">This is required!</span>}
          {errors.name && errors.name.type === "minLength" && <span className="error">Name must be atleast 3 letters long!</span>}
          <input type="text" name="name" ref={register({ required: true, minLength: 3 })} />
        </div>
        <div>
          <label>Email</label>
          {errors.email && errors.email.type === "required" && <span className="error">This is required!</span>}
          {errors.email && errors.email.type === "pattern" && <span className="error">Invalid Email Address!</span>}
          {/* eslint-disable-next-line */}
          <input type="email" name="email" ref={register({ required: true, pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i })} />
        </div>
        <div>
          <label>Phone</label>
          {errors.phone && errors.phone.type === "required" && <span className="error">This is required!</span>}
          {errors.phone && errors.phone.type === "minLength" && <span className="error">Invalid Phone Number!</span>}
          {errors.phone && errors.phone.type === "maxLength" && <span className="error">Invalid Phone Number!</span>}
          <input type="number" className="phone" name="phone" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
        </div>

        <div className="submit-button">
          <input type="submit" disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
}

export default LeadForm;