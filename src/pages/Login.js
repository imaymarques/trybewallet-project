import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emailInput } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputs = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlePassword = () => {
    const { password } = this.state;
    const num = 6;
    const result = password.length >= num;
    return result;
  };

  handleEmail = () => {
    const { email } = this.state;
    const rigthEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    const emailResult = rigthEmail.test(email);
    return emailResult;
  };

  handleBttn = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(emailInput(email));
    history.push('/carteira');
  };

  handleBttnInputs = () => this.handleEmail() && this.handlePassword();

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-page">
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="Email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleInputs }
            name="email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            placeholder="Senha"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleInputs }
            name="password"
          />
        </label>
        <button
          type="button"
          disabled={ !this.handleBttnInputs() }
          onClick={ this.handleBttn }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
