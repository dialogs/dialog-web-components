/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import ModalBody from '../ModalBody/ModalBody';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallControls from '../CallControls/CallControls';
import CallInfo from '../CallInfo/CallInfo';
import styles from './Call.css';

export type CallProps = {
  call: {
    caller: {
      title: string,
      avatar: string,
      placeholder: string,
    },
    duration: ?string
  },
  small: boolean,
  isOpen: boolean,
  className?: string,
  onMinimize: Function,
  onCallEnd: Function,
  onCallMute: Function
};

class Call extends Component {
  props: CallProps;

  static defaultProps = {
    isOpen: false
  }

  shouldComponentUpdate(nextProps: CallProps): boolean {
    return nextProps.className !== this.props.className ||
           nextProps.small !== this.props.small ||
           nextProps.isOpen !== this.props.isOpen ||
           nextProps.call !== this.props.call;
  }

  renderSmall(): React.Element<any> {
    const { call } = this.props;
    const className = classNames(styles.container, styles.small, this.props.className);

    return (
      <div className={className}>
        <CallInfo
          call={call}
          small
        />
        <CallControls
          small
          onMinimize={this.props.onMinimize}
          onCallEnd={this.props.onCallEnd}
          onCallMute={this.props.onCallMute}
        />
      </div>
    );
  }

  renderCall(): React.Element<any> {
    const { isOpen, call } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <Modal
        className={className}
        isOpen={isOpen}
        onClose={this.props.onMinimize}
      >
        <ModalBody className={styles.body}>
          <CallAvatar caller={call.caller} />
          <CallInfo call={call} />
          <CallControls
            onMinimize={this.props.onMinimize}
            onCallEnd={this.props.onCallEnd}
            onCallMute={this.props.onCallMute}
          />
        </ModalBody>
      </Modal>
    );
  }

  render(): ?React.Element<any> {
    const { isOpen, small } = this.props;

    if (!isOpen) {
      return null;
    }

    if (small) {
      return this.renderSmall();
    }

    return this.renderCall();
  }
}

export default Call;
