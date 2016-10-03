/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import type { ConnectionStatus as ConnectionStatusType } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
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

class ConnectionStatus extends Component {
  props: Props;
  state: State;
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

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.show !== this.state.show ||
           nextProps.status !== this.props.status ||
           nextProps.className !== this.props.className;
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
    if (!this.state.show) {
      return null;
    }

    const { status } = this.props;
    const className = classNames(styles.root, styles[status], this.props.className);

    return (
      <Text
        tagName="div"
        className={className}
        id={`ConnectionStatus.${status}`}
      />
    );
  }

  render() {
    return (
      <CSSTransitionGroup
        transitionName={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          leaveActive: styles.leaveActive
        }}
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
      >
        {this.renderContent()}
      </CSSTransitionGroup>
    );
  }
}

export default ConnectionStatus;
