import React, {PureComponent} from 'react';
import styles from './VideoPlayer.css';
import Icon from '../Icon/Icon';

class PlayOnPreview extends PureComponent {

  render() {
    return (
      <div className={styles.play}>
        <Icon
          className={styles.playIcon}
          glyph="play"
          theme="dark"
          size="large"
          inverted
        />
      </div>
    );
  }

}

export default PlayOnPreview;
