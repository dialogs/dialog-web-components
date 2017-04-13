/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';

import React, { PureComponent } from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import classNames from 'classnames';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  contact: PeerInfo
};

class ContactSelectorChip extends PureComponent {
  props: Props;

  render() {
    const { contact } = this.props;
    const className = classNames(styles.chip, this.props.className);

    return (
      <div className={className}>
        <PeerAvatar
          className={styles.chipAvatar}
          size="medium"
          peer={contact}
        />
        <div className={styles.chipText}>{contact.title}</div>
      </div>
    );
  }
}

export default ContactSelectorChip;
