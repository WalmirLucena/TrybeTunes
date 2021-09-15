import React from 'react';

const MIN_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };
  }

  handleChange= ({ target }) => {
    console.log(target);
    this.setState({ [target.id]: target.value });
  }

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-search">
        <forms>
          <label htmlFor="artist">
            <input
              type="text"
              id="artist"
              value={ artist }
              onChange={ this.handleChange }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artist.length < MIN_LENGTH }
          >
            Procurar

          </button>
        </forms>

        Search
      </div>
    );
  }
}
export default Search;
