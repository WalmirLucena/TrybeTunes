import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/header.css';
import logo from '../img/logo.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchGetUser();
  }

    fetchGetUser = async () => {
      const user = await getUser();
      this.setState({
        user,
        isLoading: true,
      });
    }

    renderHeader = (user) => (
      <header data-testid="header-component" className="header">
        <div className="img-container">
          <img src={ logo } alt="logo trybe" />
        </div>
        <span data-testid="header-user-name">{user.name}</span>
        <div className="break" />
        <nav>
          <Link
            to="/search"
            className="link-style"
            data-testid="link-to-search"
          >
            Pesquisa

          </Link>
          <Link
            to="/favorites"
            className="link-style"
            data-testid="link-to-favorites"
          >
            Favoritas

          </Link>
          <Link
            to="/profile"
            className="link-style"
            data-testid="link-to-profile"
          >
            Perfil

          </Link>
        </nav>
      </header>)

    render() {
      const { user, isLoading } = this.state;
      return (
        isLoading ? this.renderHeader(user) : <Loading />

      );
    }
}

export default Header;
