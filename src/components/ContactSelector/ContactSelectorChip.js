/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';

import React, { PureComponent } from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import classNames from 'classnames';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  contact: PeerInfo
};

class ContactSelectorChip extends PureComponent<Props> {
  render() {
    const { contact } = this.props;
    const className = classNames(styles.chip, this.props.className);

    return (
      <div className={className}>
        <PeerAvatar className={styles.chipAvatar} size={28} peer={contact} />
        <PeerInfoTitle title={contact.title} className={styles.chipText} emojiSize={18} />
      </div>
    );
  }
}

export default ContactSelectorChip;
