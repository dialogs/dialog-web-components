/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ContactSelectorChip from '../ContactSelectorChip/ContactSelectorChip';
import styles from '../ContactSelector/ContactSelector.css';

export type Props = {
  className?: string,
  query: string,
  selected: number[],
  contacts: Contact[],
  onChange: (query: string, event: $FlowIssue) => void,
  onSelect: (id: number) => void
};

class ContactSelectorInput extends PureComponent {
  props: Props;
  handleChange: Function;
  handleKeyDown: Function;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props): void {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event: $FlowIssue): void {
    this.props.onChange(event.target.value, event);
  }

  handleKeyDown(event: $FlowIssue): void {
    const { selected, query } = this.props;

    // Delete last selected contact
    if (event.keyCode === 8 && query === '' && selected.length) {
      this.props.onSelect(selected[selected.length - 1]);
    }
  }

  renderChips(): React.Element<any>[] {
    const { selected, contacts } = this.props;
    const chips = [];
    selected.forEach((id) => {
      const contact = contacts.find((item) => item.uid === id);
      if (contact) {
        chips.push(
          <ContactSelectorChip contact={contact} key={contact.uid} />
        );
      }
    });

    return chips;
  }

  render(): React.Element<any> {
    const { query } = this.props;
    const { l10n } = this.context;
    const className = classNames(styles.selector, this.props.className);
    const placeholder = l10n.formatText('ContactSelector.search_placeholder');

    return (
      <div className={className}>
        {this.renderChips()}
        <input
          type="text"
          className={styles.input}
          onChange={this.handleChange}
          placeholder={placeholder}
          onKeyDown={this.handleKeyDown}
          value={query}
        />
      </div>
    );
  }
}

export default ContactSelectorInput;
