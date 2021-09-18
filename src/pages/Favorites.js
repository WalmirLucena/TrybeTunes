import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
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
    const favorite = await getFavoriteSongs();

    this.setState({ isLoading: false,
      favorite });
  }

  handleFavorites = async (checkedValue, trackId) => {
    this.setState({ isLoading: false });
    const { musics } = this.state;
    const selectedMusic = musics.find((music) => music.trackId === trackId);
    if (!checkedValue) {
      await removeSong(selectedMusic);
    }
    this.fetchGetFavoriteSongs();
  }

  handleChange = ({ target }) => {
    this.handleFavorites(target.checked, parseInt(target.name, 10));
  }

  renderFavorites = () => {
    this.fetchGetFavoriteSongs();
    const { favorite } = this.state;

    return (
      <div>
        {favorite.map((music) => (<MusicCard
          music={ music }
          key={ music.trackId }
          checked
          handleChange
        />))}
      </div>);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        {isLoading ? <Loading /> : this.renderFavorites()}
      </div>
    );
  }
}
export default Favorites;
