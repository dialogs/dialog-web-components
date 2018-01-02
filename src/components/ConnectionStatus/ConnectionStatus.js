/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ConnectionStatus as ConnectionStatusType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './ConnectionStatus.css';

export type Props = {
  className?: string,
  status: ?ConnectionStatusType
};

export type State = {
  show: boolean
};

class ConnectionStatus extends PureComponent<Props, State> {
  timeoutId: ?number;

  constructor(props: Props) {
    super(props);

    this.state = {
      show: false
    };
  }

  componentWillReceiveProps(nextProps: Props): void {
    this.clearTimeout();
    this.setState({
      show: Boolean(nextProps.status)
    });
  }

  componentDidUpdate() {
    if (this.props.status === 'online') {
      this.timeoutId = setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
    }
  }

  componentWillUnmount(): void {
    this.clearTimeout();
  }

  clearTimeout() {
    if (typeof this.timeoutId === 'number') {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  renderContent() {
    const { props: { status }, state: { show } } = this;
    if (!(show && status)) {
      return null;
    }

    const className = classNames(
      styles.container,
      styles[status],
      this.props.className
    );

    return (
      <CSSTransition
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.leave,
          exitActive: styles.leaveActive
        }}
        timeout={{ enter: 150, exit: 150 }}
      >
        <Text
          tagName="div"
          className={className}
          id={`ConnectionStatus.${status}`}
        />
      </CSSTransition>
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <TransitionGroup>{this.renderContent()}</TransitionGroup>
      </div>
    );
  }
}

export default ConnectionStatus;
