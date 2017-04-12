/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact } from '@dlghq/dialog-types';
import type { ItemProps } from '../SelectList/SelectList';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import CheckButton from '../CheckButton/CheckButton';
import styles from './ContactList.css';

class ContactListItem extends PureComponent {
  props: ItemProps<Contact>;

  static render(props: ItemProps<Contact>): React.Element<any> {
    return (
      <ContactListItem {...props} />
    );
  }

  render(): React.Element<any> {
    const { item: { avatar, placeholder, name }, hovered, selected } = this.props;
    const className = classNames(styles.contact, {
      [styles.hovered]: hovered
    });

    return (
      <div className={className}>
        <div className={styles.wrapper}>
          <Avatar
            className={styles.avatar}
            size="large"
            title={name}
            image={avatar}
            placeholder={placeholder}
          />
          <div className={styles.text}>
            <span className={styles.name}>{name}</span>
          </div>
          <CheckButton checked={selected} className={styles.selector} theme="success" />
        </div>
      </div>
    );
  }
}

export default ContactListItem;
