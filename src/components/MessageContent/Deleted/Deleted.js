/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './Deleted.css';

type Props = {
  className?: string,
  maxWidth: number
};

class Deleted extends PureComponent<Props> {
  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Text
          className={styles.text}
          id={this.props.maxWidth > 300 ? 'MessageContent.deleted' : 'MessageContent.deleted_short'}
        />
      </div>
    );
  }
}

export default Deleted;
