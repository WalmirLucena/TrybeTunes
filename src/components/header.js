import React from 'react';
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
      </header>)

    render() {
      const { user, isLoading } = this.state;
      return (
        isLoading ? this.renderHeader(user) : <Loading />

      );
    }
}

export default Header;
