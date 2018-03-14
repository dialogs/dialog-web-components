/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Icon from '../../Icon/Icon';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivityMediaDocument.css';

type Props = {
  title: ?string,
  size: ?string,
  sender?: ?string,
  extension: ?string
};

class ActivityMediaDocument extends PureComponent<Props> {
  renderPreview() {
    const { extension } = this.props;

    return (
      <div className={styles.preview} title={extension}>
        <span className={styles.extension}>{extension}</span>
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    if (!title || title === '') {
      return <Text id="ActivityMedia.document" className={styles.title} tagName="div" />;
    }

    return <div className={styles.title}>{title}</div>;
  }

  renderSender() {
    const { sender } = this.props;

    if (!sender) {
      return null;
    }

    return (
      <div className={styles.sender}>
        {'\u00A0'}-{'\u00A0'}
        <PeerInfoTitle title={sender || ''} emojiSize={16} />
      </div>
    );
  }

  render() {
    const { size } = this.props;

    return (
      <div className={styles.container}>
        {this.renderPreview()}
        <div className={styles.meta}>
          {this.renderTitle()}
          <div className={styles.info}>
            <Icon glyph="arrow_down" className={styles.arrow} size={16} />
            {size}
            {this.renderSender()}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityMediaDocument;
