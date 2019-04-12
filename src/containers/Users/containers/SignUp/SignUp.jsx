import './index.css';

import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';  
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signupUser } from '../../services/actions';

const styles = theme => ({

});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return !this.props.fetching
      && this.state.user.first_name.lenght > 0
      && this.state.user.last_name.length > 0
      && this.state.user.username.length > 0
      && this.state.user.email.length > 0
      && this.state.user.password.length > 0
      && this.state.user.password_confirmation.length >= 6;
  }

  onChange(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;
    return this.setState({user: user});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signupUser(this.state.user);
  }

  render() {
    const { classes, isAuthenticated, message } = this.props;

    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string
}

function mapStateToProps(state) {
  return {}
}

const connectedSignUP = connect(mapStateToProps, { signupUser })(SignUp);

export { connectedSignUP as SignUp };
