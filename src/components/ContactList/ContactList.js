/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { filter } from 'fuzzaldrin';
import classNames from 'classnames';
import ContactListItem from '../ContactListItem/ContactListItem';
import styles from './ContactList.css';

export type Props = {
  className?: string,
  query: string,
  selected: number[],
  contacts: Contact[],
  onSelect: (id: number) => void
};

class ContactList extends PureComponent {
  props: Props;

  renderContacts(): React.Element<any>[] {
    const { contacts, selected, query } = this.props;
    const filteredContacts = filter(contacts, query, { key: 'name' });

    return filteredContacts.map((contact) => (
      <ContactListItem
        key={contact.uid}
        contact={contact}
        onClick={this.props.onSelect}
        isSelected={selected.indexOf(contact.uid) > -1}
      />
    ));
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
