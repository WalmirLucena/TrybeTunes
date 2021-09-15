import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
      <header data-testid="header-component">
        Header
        <span data-testid="header-user-name">{user.name}</span>
        <BrowserRouter>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </BrowserRouter>
      </header>)

    render() {
      const { user, isLoading } = this.state;
      return (
        isLoading ? this.renderHeader(user) : <Loading />

      );
    }
}

export default Header;
