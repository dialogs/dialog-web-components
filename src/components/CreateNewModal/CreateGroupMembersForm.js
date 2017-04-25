/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import ContactSelector from '../ContactSelector/ContactSelector';
import styles from './CreateNewModal.css';

export type Props = {
  id: string,
  autoFocus: boolean,
  members: SelectorState<PeerInfo>,
  onSubmit: (event: SyntheticEvent) => void,
  onChange: (members: SelectorState<PeerInfo>) => any,
}

class CreateGroupMembersForm extends PureComponent {
  props: Props;

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    this.props.onSubmit(event);
  };

  render() {
    return (
      <form
        className={styles.members}
        id={this.props.id}
        onSubmit={this.handleSubmit}
      >
        <ContactSelector
          autoFocus={this.props.autoFocus}
          selector={this.props.members}
          onChange={this.props.onChange}
        />
      </form>
    );
  }
}

export default CreateGroupMembersForm;
