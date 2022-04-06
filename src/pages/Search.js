import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Header from '../components/header';
import '../styles/search.css';

const MIN_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      albums: [],
      isLoading: false,
      lastArtist: '',
    };
  }

  handleChange= ({ target }) => {
    this.setState({ [target.id]: target.value });
  }

  handleClick = async () => {
    this.setState({
      isLoading: true,
    });
    const { artist } = this.state;
    const album = await searchAlbumsAPI(artist);
    this.setState({
      artist: '',
      albums: album,
      isLoading: false,
      lastArtist: artist,
    });
  }

  renderSearch = (artist) => (
    <div className="form-container">
      <form>
        <label htmlFor="artist">

          <input
            type="text"
            id="artist"
            value={ artist }
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ artist.length < MIN_LENGTH }
          onClick={ this.handleClick }
        >
          Procurar

        </button>
      </form>
    </div>)

    mapAlbum = (albums) => albums.map((album) => (
      <div className="album" key={ album.collectionId }>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }

        >
          <img
            src={ album.artworkUrl100 }
            alt={ `${album.artistName} album` }
          />
        </Link>
        <div>
          <h4>{album.collectionName}</h4>
          <p>{album.artistName}</p>
        </div>

      </div>))

    renderAlbumsResult = ({ albums, lastArtist }) => {
      if (lastArtist !== '' && albums.length === 0) {
        return <h1 className="notFound">Nenhum álbum foi encontrado</h1>;
      }
      if (lastArtist !== '') {
        return (
          <section>
            <div className="h2-container">
              <h2>
                Resultado de álbuns de:
                {' '}
                {lastArtist}
              </h2>
            </div>
            <div className="album-container">
              {this.mapAlbum(albums)}
            </div>
          </section>
        );
      }
    }

    render() {
      const { artist, isLoading } = this.state;
      return (
        <div data-testid="page-search">
          <Header />
          {isLoading ? <Loading /> : this.renderSearch(artist)}
          {this.renderAlbumsResult(this.state)}
        </div>
      );
    }
}
export default Search;
