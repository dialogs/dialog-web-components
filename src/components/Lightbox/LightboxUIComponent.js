import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './Lightbox.css';

export type Props = {
  onClose: () => void,
  onZoom: () => void,
  onPrev: () => void,
  onNext: () => void
}

class LightboxUIComponent extends PureComponent {
  props: Props;

  render() {
    console.debug('LightboxUIComponent', this.props);

    return (
      <div className={classNames(styles.ui, styles.uiHidden)}>
        <div className={styles.toolbar}>
          <div className={styles.reaction}>Reaction</div>

          <div className={styles.title}>Title</div>

          <div className={styles.controls}>
            <button className={styles.buttonClose} title="Close (Esc)" onClick={this.props.onClose}>
              <Icon glyph="close" />
            </button>
            <button className={styles.buttonZoom} title="Zoom in/out" onClick={this.props.onZoom}>
              <Icon glyph="zoom_in" />
            </button>
          </div>
        </div>

        <div className={styles.counter} />

        <div className={styles.preloader} />

        <button className={styles.buttonPrev} title="Previous (arrow left)" onClick={this.props.onPrev} />
        <button className={styles.buttonNext} title="Next (arrow right)" onClick={this.props.onNext} />

      </div>
    );
  }
}

export default LightboxUIComponent;
