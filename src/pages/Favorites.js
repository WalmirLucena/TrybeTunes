import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      favorite: [],
    };
  }

  componentDidMount() {
    this.fetchGetFavoriteSongs();
  }

  fetchGetFavoriteSongs = async () => {
    this.setState({ isLoading: true });
    const favorite = await getFavoriteSongs();

    this.setState({ isLoading: false,
      favorite });
  }

  handleFavorites = async (checkedValue, trackId) => {
    this.setState({ isLoading: true });
    const { favorite } = this.state;

    const selectedMusic = favorite.find((music) => music.trackId === trackId);
    if (checkedValue === false) {
      await removeSong(selectedMusic);
    }

    this.fetchGetFavoriteSongs();
  }

  handleChange = ({ target }) => {
    this.handleFavorites(target.checked, Number(target.value));
  }

  renderFavorites = () => {
    const { favorite } = this.state;
    if (favorite.length > 0) {
      return (
        <div>
          {favorite.map((music) => (<MusicCard
            music={ music }
            key={ music.trackId }
            checked
            handleChange={ this.handleChange }
          />))}
        </div>);
    }
    return (<div> Não há uma lista de favoritos</div>);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        {isLoading ? <Loading /> : this.renderFavorites() }
      </div>
    );
  }
}
export default Favorites;
