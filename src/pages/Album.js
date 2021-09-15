import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchGetMusics();
  }

  fetchGetMusics = async () => {
    const { match: { params: { id } } } = this.props; //
    const musics = await getMusics(id);
    console.log(musics);
    this.setState({
      musics,
      isLoading: false,
    });
  }

  renderMusicList = () => {
    const { musics } = this.state;
    return (
      <div>
        <h3 data-testid="artist-name">{musics[0].artistName}</h3>
        <h4 data-testid="album-name">{musics[0].collectionName}</h4>
        {musics.slice(1).map((music) => (
          <MusicCard key={ music.collectionId } music={ music } />))}
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
