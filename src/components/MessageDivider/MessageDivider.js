/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import styles from './MessageDivider.css';

export type Props = {
  className?: string,
  theme: ColorTheme,
  children: Node,
  visible: boolean
};

class MessageDivider extends PureComponent<Props> {
  static defaultProps = {
    theme: 'default',
    visible: true
  };

  render() {
    const className = classNames(styles.container, styles[this.props.theme], this.props.className);

    return (
      <CSSTransition
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          exitActive: styles.leaveActive
        }}
        timeout={{
          enter: 300, exit: 300
        }}
        unmountOnExit
        in={this.props.visible}
      >
        <div className={className}>
          <div className={styles.text}>
            {this.props.children}
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default MessageDivider;
