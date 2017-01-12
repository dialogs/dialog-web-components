/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact } from '@dlghq/dialog-types';

import React, { PureComponent } from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import classNames from 'classnames';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  contact: Contact
};

class ContactSelectorChip extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const { contact } = this.props;
    const className = classNames(styles.chip, this.props.className);

    return (
      <div className={className}>
        <PeerAvatar
          peer={contact}
          size="medium"
          className={styles.chipAvatar}
        />
        <div className={styles.chipText}>{contact.name}</div>
      </div>
    );
  }
}

export default ContactSelectorChip;
