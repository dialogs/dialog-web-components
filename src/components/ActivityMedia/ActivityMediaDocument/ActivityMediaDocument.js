/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Icon from '../../Icon/Icon';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivityMediaDocument.css';

type Props = {
  title: string,
  size: string,
  sender: string,
  extension: string
};

class ActivityMediaDocument extends PureComponent {
  props: Props;

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
      return (
        <Text
          id="ActivityMediaDocumment.title"
          className={styles.title}
          tagName="div"
        />
      );
    }

    return (
      <div className={styles.title}>{title}</div>
    );
  }

  render() {
    const { size, sender } = this.props;

    return (
      <div className={styles.container}>
        {this.renderPreview()}
        <div className={styles.meta}>
          {this.renderTitle()}
          <div className={styles.info}>
            <Icon glyph="arrow_down" className={styles.arrow} size={16} />
            {size}
            {'\u00A0'}-{'\u00A0'}
            <PeerInfoTitle title={sender} />
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityMediaDocument;
