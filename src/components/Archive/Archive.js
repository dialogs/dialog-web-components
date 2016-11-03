/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { ShortRecent } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ArchiveList from './ArchiveList';
import Button from '../Button/Button';
import styles from './Archive.css';

export type Props = {
  className?: string,
  pending: boolean,
  archive: ShortRecent[],
  onOpen: () => void,
  onClose: () => void,
  onLoadMore: () => void
};

export type State = {
  isOpen: boolean
};

class Archive extends PureComponent {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleArchiveToggle = () => {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
    if (isOpen) {
      this.props.onOpen();
    } else {
      this.props.onClose();
    }
  };

  renderToggler() {
    const { isOpen } = this.state;
    const { pending } = this.props;

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
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <ArchiveList
        className={styles.archive}
        items={this.props.archive}
        pending={this.props.pending}
        onLoadMore={this.props.onLoadMore}
      />
    );
  }

  render(): React.Element<any> {
    const { isOpen } = this.state;
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
