/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

// import type { Call } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Markdown from '../Markdown/Markdown';
import { Text } from '@dlghq/react-l10n';
import Icon from '../Icon/Icon';
import Hover from '../Hover/Hover';
import { CSSTransition } from 'react-transition-group';
import styles from './CallFingerprint.css';

type Props = {
  fingerprint: string,
  className?: string,
  isVideoRuning: boolean
};

type State = {
  show: boolean
};

class CallFingerprint extends PureComponent<Props, State> {
  timeout: ?TimeoutID;

  constructor(props: Props) {
    super(props);

    this.state = {
      show: true
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ show: false });
    }, 5000);
  }

  componentWillUnmount(): void {
    this.clearTimeout();
  }

  handleHover = (hover: boolean): void => {
    if (this.timeout && !hover) {
      this.clearTimeout();
    }

    this.setState({ show: hover });
  };

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  renderFingerprint() {
    return (
      <CSSTransition
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          exitActive: styles.leaveActive
        }}
        timeout={{
          enter: 250,
          exit: 250
        }}
        unmountOnExit
        in={this.state.show}
      >
        <div className={styles.fingerprint}>
          <Markdown renderBigEmoji={false} text={this.props.fingerprint} emojiSize={24} />
        </div>
      </CSSTransition>
    );
  }

  renderHint() {
    return (
      <CSSTransition
        classNames={{
          enter: styles.hintEnter,
          enterActive: styles.hintEnterActive,
          leave: styles.hintLeave,
          exitActive: styles.hintLeaveActive
        }}
        timeout={{
          enter: 250,
          exit: 250
        }}
        unmountOnExit
        in={this.state.show}
      >
        <Text id="Call.fingerprint" className={styles.hint} />
      </CSSTransition>
    );
  }

  render() {
    const className = classNames(
      styles.container,
      this.props.isVideoRuning ? styles.withVideo : null,
      this.props.className
    );

    return (
      <div className={className}>
        <Hover onHover={this.handleHover} className={styles.wrapper}>
          <Icon
            glyph="lock"
            className={styles.lock}
            size={24}
            theme="success"
          />
          {this.renderFingerprint()}
        </Hover>
        {this.renderHint()}
      </div>
    );
  }
}

export default CallFingerprint;
