/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';
import React, { PureComponent, type Node } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ContactList from '../ContactList/ContactList';
import ContactSelectorInput from './ContactSelectorInput';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  autoFocus: boolean,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => mixed,
};

class ContactSelector extends PureComponent<Props> {
  renderEmpty = (): Node => {
    const { selector } = this.props;

    if (selector.getItems().size === 0 && selector.getQuery() === '') {
      return (
        <div className={styles.empty}>
          <Text id="ContactSelector.no_contacts" />
        </div>
      );
    }

    return (
      <div className={styles.empty}>
        <Text id="ContactSelector.not_found" />
      </div>
    );
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <ContactSelectorInput
          selector={this.props.selector}
          autoFocus={this.props.autoFocus}
          onChange={this.props.onChange}
        />
        <ContactList
          selector={this.props.selector}
          onChange={this.props.onChange}
          renderEmpty={this.renderEmpty}
        />
      </div>
    );
  }
}

export default ContactSelector;
