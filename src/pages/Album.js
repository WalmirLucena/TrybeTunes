import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      isLoading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchGetMusics();
    this.fetchGetFavorites();
  }

  fetchGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ isLoading: true });
    const musics = await getMusics(id);

    this.setState({
      musics,
      isLoading: false,
    });
  }

  fetchGetFavorites = async () => {
    this.setState({ isLoading: true });
    const favorites = await getFavoriteSongs();

    this.setState({
      isLoading: false,
      favorites });
  }

  handleFavorites = async (checkedValue, trackId) => {
    const { musics } = this.state;

    const selectedMusic = musics.find((music) => music.trackId === trackId);
    this.setState({ isLoading: true });

    await (checkedValue
      ? addSong(selectedMusic) : removeSong(selectedMusic));
    this.fetchGetFavorites();
    this.setState({ isLoading: false });
  }

  handleChange = ({ target }) => {
    console.log(target.name);
    console.log(Number(target.name));
    this.handleFavorites(target.checked, parseInt(target.id, 10));
  }

  renderMusicList = () => {
    const { musics, favorites } = this.state;
    console.log(favorites);

    return (
      <div>
        <h3 data-testid="artist-name">{musics[0].artistName}</h3>
        <h4 data-testid="album-name">{musics[0].collectionName}</h4>
        {musics.slice(1).map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            checked={ favorites.some((favSong) => favSong.trackId === music.trackId) }
            handleChange={ this.handleChange }
          />))}
      </div>);
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-album">
        {isLoading ? <Loading /> : this.renderMusicList()}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Album;
