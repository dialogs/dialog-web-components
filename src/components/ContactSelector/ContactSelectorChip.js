/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';

import React, { PureComponent } from 'react';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import classNames from 'classnames';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import Hover from '../Hover/Hover';
import Icon from '../Icon/Icon';
import styles from './ContactSelector.css';

export type Props = {
  className?: string,
  contact: PeerInfo,
  onDelete: (contact: PeerInfo) => mixed,
};

export type State = {
  hover: boolean,
};

class ContactSelectorChip extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  handleHover = (hover: boolean): void => {
    this.setState({ hover });
  };

  handleDelete = (): void => {
    this.props.onDelete(this.props.contact);
  };

  render() {
    const { contact } = this.props;
    const { hover } = this.state;
    const className = classNames(styles.chip, this.props.className);

    return (
      <Hover
        className={className}
        onHover={this.handleHover}
        onClick={this.handleDelete}
      >
        <div className={styles.avatarWrapper}>
          {hover ? (
            <Icon glyph="close" size={20} className={styles.deleteIcon} />
          ) : (
            <PeerAvatar
              className={styles.chipAvatar}
              size={30}
              peer={contact}
            />
          )}
        </div>
        <PeerInfoTitle
          title={contact.title}
          className={styles.chipText}
          emojiSize={18}
        />
      </Hover>
    );
  }
}

export default ContactSelectorChip;
