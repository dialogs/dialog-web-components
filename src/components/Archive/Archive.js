/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, ShortRecent } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
// $FlowFixMe: https://github.com/facebook/flow/issues/2092
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ArchiveList from './ArchiveList';
import Button from '../Button/Button';
import styles from './Archive.css';

export type Props = {
  className?: string,
  isOpen: boolean,
  pending: boolean,
  archive: ShortRecent[],
  onOpen: () => void,
  onClose: () => void,
  onLoadMore: () => void,
  onSelect: (peer: Peer) => void
};

class Archive extends PureComponent {
  props: Props;

  handleArchiveToggle = () => {
    const { isOpen } = this.props;

    if (isOpen) {
      this.props.onClose();
    } else {
      this.props.onOpen();
    }
  };

  renderToggler() {
    const { isOpen, pending } = this.props;

    return (
      <Button
        className={styles.button}
        onClick={this.handleArchiveToggle}
        loading={pending}
        size="small"
        theme="default"
        wide
        rounded={false}
      >
        {
          isOpen
            ? <span>Back</span>
            : <span>Archive</span>
        }
      </Button>
    );
  }

  renderArchive() {
    if (!this.props.isOpen) {
      return null;
    }

    return (
      <ArchiveList
        className={styles.archive}
        items={this.props.archive}
        pending={this.props.pending}
        onLoadMore={this.props.onLoadMore}
        onSelect={this.props.onSelect}
      />
    );
  }

  render(): React.Element<any> {
    const { isOpen } = this.props;
    const className = classNames(styles.container, {
      [styles.opened]: isOpen
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderToggler()}
        <CSSTransitionGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive
          }}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={50}
        >
          {this.renderArchive()}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Archive;
