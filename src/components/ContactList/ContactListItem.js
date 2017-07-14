/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { ItemProps } from '../SelectList/SelectList';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import CheckButton from '../CheckButton/CheckButton';
import styles from './ContactList.css';

class ContactListItem extends PureComponent {
  props: ItemProps<PeerInfo>;

  static render(props: ItemProps<PeerInfo>) {
    return (
      <ContactListItem {...props} />
    );
  }

  render() {
    const { item, hovered, selected } = this.props;
    const className = classNames(styles.contact, {
      [styles.hovered]: hovered
    });

    return (
      <div className={className}>
        <div className={styles.wrapper}>
          <PeerAvatar
            className={styles.avatar}
            size="large"
            peer={item}
          />
          <div className={styles.text}>
            <span className={styles.name}>{item.title}</span>
          </div>
          <CheckButton
            className={styles.selector}
            theme="success"
            checked={selected}
          />
        </div>
      </div>
    );
  }
}

export default ContactListItem;
