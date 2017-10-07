/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivityMediaPhoto.css';

type Props = {
  photo: ?string,
  preview: ?string,
  sender: ?string,
  title: ?string
};

class ActivityMediaPhoto extends PureComponent {
  props: Props;

  renderTitle() {
    const { title } = this.props;

    if (!title || title === '') {
      return (
        <Text
          id="ActivityMedia.photo.title"
          className={styles.title}
          tagName="div"
        />
      );
    }

    return <div className={styles.title}>{title}</div>;
  }

  render() {
    const { preview, photo, sender } = this.props;

    return (
      <div className={styles.container}>
        {photo && preview ? (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${preview})` }}
          >
            <div
              className={styles.photo}
              style={{ backgroundImage: `url(${photo})` }}
            />
          </div>
        ) : null}
        <div className={styles.meta}>
          {this.renderTitle()}
          {sender ? (
            <div className={styles.info}>
              <PeerInfoTitle title={sender} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ActivityMediaPhoto;
