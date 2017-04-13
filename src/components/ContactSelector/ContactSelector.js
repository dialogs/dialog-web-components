/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ContactList from '../ContactList/ContactList';
import ContactSelectorInput from './ContactSelectorInput';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  autoFocus: boolean,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => any
};

class ContactSelector extends PureComponent {
  props: Props;

  render(): React.Element<any> {
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
        />
      </div>
    );
  }
}

export default ContactSelector;
