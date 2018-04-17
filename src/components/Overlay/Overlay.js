/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import styles from './Overlay.css';

export type Props = {
  className?: string,
  children?: Node,
  active: boolean,
  renderCaption?: () => Node,
  onClick: () => mixed
};

class Overlay extends PureComponent<Props> {
  renderOverlay() {
    const { active } = this.props;

    if (!active) {
      return null;
    }

    return (
      <CSSTransition
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.leave,
          exitActive: styles.leaveActive
        }}
        timeout={{ enter: 100, exit: 100 }}
      >
        <div className={styles.overlay} onClick={this.props.onClick}>
          {this.props.renderCaption ? (
            <div className={styles.caption}>
              {this.props.renderCaption()}
            </div>
          ) : null}
        </div>
      </CSSTransition>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <TransitionGroup>
          {this.renderOverlay()}
        </TransitionGroup>
        {this.props.children}
      </div>
    );
  }
}

export default Overlay;
