/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivityMediaVideo.css';
import getHumanTime from '../../../utils/getHumanTime';

type Props = {
  url: ?string,
  title: ?string,
  size: ?string,
  preview: ?string,
  duration: ?string,
  sender: ?string
};

class ActivityMediaVideo extends PureComponent {
  props: Props;

  renderPreview() {
    const className = classNames(styles.preview, {
      [styles.previewEmpty]: !this.props.preview
    });

    return (
      <div className={className} style={this.props.preview ? { backgroundImage: `url(${this.props.preview})`} : {}}>
        <Icon glyph="play_arrow" size={22} className={styles.play} />
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    if (!title || title === '') {
      return (
        <Text
          id="ActivityMedia.video.title"
          className={styles.title}
          tagName="div"
        />
      );
    }

    return <div className={styles.title}>{title}</div>;
  }

  render() {
    const { duration, size, sender } = this.props;

    return (
      <div className={styles.container}>
        {this.renderPreview()}
        <div className={styles.meta}>
          {this.renderTitle()}
          <div className={styles.info}>
            {
              size ? (
                <span>
                  {size}
                  {'\u00A0'}-{'\u00A0'}
                </span>
              ) : null
            }
            {
              duration ? (
                <span>
                  {getHumanTime(duration * 10)}
                  {'\u00A0'}-{'\u00A0'}
                </span>
              ) : null
            }
            <PeerInfoTitle title={sender || ''} />
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityMediaVideo;
