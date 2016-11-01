/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import RecentItem from '../RecentItem/RecentItem';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Archive.css';

export type Props = {
  className?: string,
  archive: PeerInfo[]
};

export type Props = {
  isOpen: boolean
};

class Archive extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    console.debug(props);

    this.state = {
      isOpen: false
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.isOpen !== this.state.isOpen ||
           nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  handleArchiveToggle = () => {
    console.debug('handleArchiveToggle');
    this.setState({ isOpen: !this.state.isOpen })
  };

  renderToggler() {
    const { isOpen } = this.state;

    return (
      <div className={styles.button} onClick={this.handleArchiveToggle}>
        {
          isOpen
            ? <span>Back</span>
            : <span>Archive</span>
        }
      </div>
    );
  }

  renderArchive() {
    const { isOpen } = this.state;
    const { archive } = this.props;

    if (!isOpen) {
      return null;
    }

    const children = archive.map((dialog) => {
      console.debug(dialog);
      return (
        <RecentItem info={dialog} key={dialog.peer.id} />
      );
    });

    return(
      <div className={styles.archive}>
        {children}
      </div>
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
