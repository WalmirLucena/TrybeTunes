import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import Header from '../components/header';
import '../styles/favorite.css';

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
        <div className="favorite-container">
          <h2>Músicas favoritas :</h2>
          {favorite.map((music) => (
            <div key={ music.trackId } className="fav-musics">
              <img src={ music.artworkUrl100 } alt="album" />

              <MusicCard
                music={ music }
                checked
                handleChange={ this.handleChange }
              />
            </div>
          ))}
        </div>
      );
    }
    return (<h1> Não há uma lista de favoritos</h1>);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites" className="favorite-content">
        <Header />
        {isLoading ? <Loading /> : this.renderFavorites() }
      </div>
    );
  }
}
export default Favorites;
