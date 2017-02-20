import React, { PureComponent } from 'react';
import styles from './ProgressBar.css';
import Icon from '../../Icon/Icon';

export type Props = {
  onClick?: ( ) => any
};

class Sound extends PureComponent {
  props: Props;

  render( ) {

    return (
      <div className={styles.sound}>
        <Icon
            className={styles.soundIcon}
            glyph="sound"
            theme="light"
            size="normal"/>
      </div>
    );
  }

}

export default Sound;
