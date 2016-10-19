/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ContactList from '../ContactList/ContactList';
import ContactSelectorInput from '../ContactSelectorInput/ContactSelectorInput';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  selected: number[],
  contacts: Contact[],
  onSelect: (id: number) => void
};

export type State = {
  query: string
}

class ContactSelector extends PureComponent {
  props: Props;
  state: State;
  handleChange: (query: string, event: $FlowIssue) => void;

  constructor(props: Props): void {
    super(props);

    this.state = {
      query: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(query: string): void {
    this.setState({ query });
  }

  render(): React.Element<any> {
    const { contacts, selected } = this.props;
    const { query } = this.state;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <ContactSelectorInput
          query={query}
          selected={selected}
          contacts={contacts}
          onChange={this.handleChange}
          onSelect={this.props.onSelect}
        />
        <ContactList
          query={query}
          contacts={contacts}
          selected={selected}
          onSelect={this.props.onSelect}
        />
      </div>
    );
  }
}

export default ContactSelector;
