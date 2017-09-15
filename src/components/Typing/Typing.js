/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Typing as TypingType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import Spinner from '../Spinner/Spinner';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import styles from './Typing.css';

export type TypingProps = {
  typing: TypingType,
  className?: string
};

class Typing extends PureComponent {
  props: TypingProps;

  renderTyping(): ?React.Element<any> {
    const { typing } = this.props;

    if (!typing) {
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
        <div className={styles.typing}>
          <Spinner type="dotted" className={styles.indicator} />
          <div className={styles.text}>{typing}</div>
        </div>
      </CSSTransition>
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <TransitionGroup>{this.renderTyping()}</TransitionGroup>
      </div>
    );
  }
}

export default Typing;
