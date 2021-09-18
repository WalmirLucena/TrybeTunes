import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
    renderMusicCard = () => {
      const { music, checked, handleChange } = this.props;
      const { previewUrl, trackName, trackId } = music;
      return (
        <div>
          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor={ `checkbox-music-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
          >
            <input
              type="checkbox"
              id={ `checkbox-music-${trackId}` }
              value={ trackId }
              name="favorite"
              checked={ checked }
              onChange={ handleChange }
            />
          </label>
        </div>);
    }

    render() {
      return (
        this.renderMusicCard()
      );
    }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.any).isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,

};

export default MusicCard;
