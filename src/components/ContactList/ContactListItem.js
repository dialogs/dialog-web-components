/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { ItemProps } from '../SelectList/SelectList';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import CheckButton from '../CheckButton/CheckButton';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import styles from './ContactList.css';

class ContactListItem extends PureComponent<ItemProps<PeerInfo>> {
  static render(props: ItemProps<PeerInfo>) {
    return <ContactListItem {...props} />;
  }

  render() {
    const { item, hovered, selected } = this.props;
    const className = classNames(styles.contact, {
      [styles.hovered]: hovered
    });

    return (
      <div className={className} id={`contact_${item.peer.id}`}>
        <div className={styles.wrapper}>
          <PeerAvatar className={styles.avatar} size={40} peer={item} />
          <div className={styles.text}>
            <PeerInfoTitle
              className={styles.nameWrapper}
              title={item.title}
              titleClassName={styles.nameText}
              emojiSize={18}
            />
          </div>
          <CheckButton className={styles.selector} theme="success" checked={selected} />
        </div>
      </div>
    );
  }
}

export default ContactListItem;
