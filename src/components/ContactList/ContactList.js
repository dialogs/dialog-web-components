/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact as ContactType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ContactListItem from '../ContactListItem/ContactListItem';
import styles from './ContactList.css';

export type Contact = ContactType & {
  isSelected: boolean,
  isHovered: boolean
};

export type Props = {
  className?: string,
  contacts: Contact[]
};

class ContactList extends PureComponent {
  props: Props;

  renderContacts(): React.Element<any>[] {
    const { contacts } = this.props;

    return contacts.map((contact) => <ContactListItem key={contact.uid} contact={contact} />);
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderContacts()}
      </div>
    );
  }
}

export default ContactList;
