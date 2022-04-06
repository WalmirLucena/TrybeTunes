import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/login.css';
import logoWhite from '../img/logoWhite.png';

const MIN_LENGTH = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
    };
  }

  handleClick = () => {
    const { history } = this.props;
    const { name } = this.state;
    const user = {
      name,
    };
    this.setState({ isLoading: true }, () => {
      createUser(user).then(() => history.push('search'));
    });
  }

  handleChange= ({ target }) => {
    this.setState({ [target.id]: target.value });
  }

  loginForms = (name) => (
    <div data-testid="page-login" className="login-container">
      <div className="logo-container">
        <img src={ logoWhite } alt="Logo Trybe" />
      </div>
      <form>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            value={ name }
            placeholder="Nome"
            onChange={ this.handleChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ name.length < MIN_LENGTH }
          data-testid="login-submit-button"
        >
          Entrar

        </button>
      </form>
    </div>
  )

  render() {
    const { name, isLoading } = this.state;

    return (
      isLoading ? <Loading /> : this.loginForms(name)
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Login;
