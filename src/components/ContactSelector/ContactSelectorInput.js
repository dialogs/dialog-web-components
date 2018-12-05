/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';

import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ContactSelectorChip from './ContactSelectorChip';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  autoFocus: boolean,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => mixed,
};

class ContactSelectorInput extends PureComponent<Props> {
  input: ?HTMLInputElement;

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  componentDidMount() {
    this.autoFocus();
  }

  handleBlur = (): void => {
    this.autoFocus();
  };

  handleChange = (event: $FlowIssue): void => {
    this.props.onChange(this.props.selector.setQuery(event.target.value));
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<>): void => {
    this.props.onChange(this.props.selector.handleKeyboardEvent(event));
  };

  handleDelete = (contact: PeerInfo): void => {
    this.props.onChange(this.props.selector.deleteSelected(contact));
  };

  getPlaceholder(): string {
    return this.context.l10n.formatText('ContactSelector.search_placeholder');
  }

  setInput = (input: ?HTMLInputElement): void => {
    this.input = input;
  };

  autoFocus(): void {
    if (this.props.autoFocus && this.input) {
      this.input.focus();
    }
  }

  renderChips() {
    const selected = this.props.selector.getSelected().toArray();

    return selected.map((contact) => {
      return (
        <ContactSelectorChip
          key={contact.peer.id}
          contact={contact}
          onDelete={this.handleDelete}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.selector, this.props.className);

    return (
      <div className={className}>
        {this.renderChips()}
        <input
          ref={this.setInput}
          className={styles.input}
          type="text"
          id="contact_selector_input"
          value={this.props.selector.getQuery()}
          placeholder={this.getPlaceholder()}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

export default ContactSelectorInput;
