/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Typing as TypingType } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import classNames from 'classnames';
import styles from './Typing.css';

export type TypingProps = {
  typing: TypingType,
  className?: string
}

class Typing extends Component {
  props: TypingProps;

  shouldComponentUpdate(nextProps: TypingProps): boolean {
    return nextProps.typing !== this.props.typing ||
           nextProps.className !== this.props.className;
  }

  renderTyping(): ?React.Element<any> {
    const { typing } = this.props;

    if (!typing) {
      return null;
    }

    return (
      <div className={styles.typing}>
        <Spinner type="dotted" className={styles.indicator} />
        <div className={styles.text}>{typing}</div>
      </div>
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <CSSTransitionGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive
          }}
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
        >
          {this.renderTyping()}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Typing;
