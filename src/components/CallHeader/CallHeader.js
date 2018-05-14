/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Call } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import isOnCall from '../Call/utils/isOnCall';
import Markdown from '../Markdown/Markdown';
import Tooltip from '../Tooltip/Tooltip';
import Icon from '../Icon/Icon';
import Hover from '../Hover/Hover';
import { CSSTransition } from 'react-transition-group';
import styles from './CallHeader.css';

type Props = {
  call: Call,
  isVisible: boolean,
  withVideo: boolean,
  onClick?: ?() => mixed,
  onLockClick?: ?() => mixed
};

type State = {
  showFingerprint: boolean
};

class CallHeader extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showFingerprint: false
    };
  }

  handleHover = (hover: boolean): void => {
    this.setState({ showFingerprint: hover });
  };

  renderFingerprint() {
    const { call } = this.props;

    if (!call.fingerprint) {
      return null;
    }

    return (
      <CSSTransition
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          exitActive: styles.leaveActive
        }}
        timeout={{
          enter: 150,
          exit: 150
        }}
        unmountOnExit
        in={this.state.showFingerprint}
      >
        <div className={styles.fingerprintWrapper}>
          <Markdown
            className={styles.fingerprint}
            renderBigEmoji={false}
            text={call.fingerprint}
            emojiSize={24}
          />
        </div>
      </CSSTransition>
    );
  }

  renderInfo() {
    const { call, withVideo } = this.props;
    const onCall = isOnCall(call.state);

    return (
      <CSSTransition
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          leave: styles.leave,
          exitActive: styles.leaveActive
        }}
        timeout={{
          enter: 150,
          exit: 150
        }}
        unmountOnExit
        in={!this.state.showFingerprint}
      >
        <CallInfo
          className={styles.info}
          call={call}
          onCall={onCall}
          withVideo={withVideo}
          onClick={this.props.onClick}
        />
      </CSSTransition>
    );
  }

  renderLockIcon() {
    const { call } = this.props;

    if (!call.fingerprint) {
      return null;
    }

    return (
      <Hover onHover={this.handleHover} className={styles.lockWrapper}>
        <Tooltip text="Call.fingerprint">
          <Icon
            glyph="lock"
            className={styles.lock}
            size={16}
            theme="success"
            onClick={this.props.onLockClick ? this.props.onLockClick : undefined}
          />
        </Tooltip>
      </Hover>
    );
  }

  render() {
    const { call, isVisible, withVideo } = this.props;
    const onCall = isOnCall(call.state);
    const className = classNames(styles.container, {
      [styles.hide]: !isVisible,
      [styles.withVideo]: withVideo
    });
    const avatarSize = withVideo ? 40 : 50;

    return (
      <header className={className}>
        <CallAvatar
          peer={call.peer}
          size={avatarSize}
          animated={!onCall}
          onClick={this.props.onClick ? this.props.onClick : undefined}
        />
        <div className={styles.body} style={{ height: avatarSize }}>
          {this.renderFingerprint()}
          {this.renderInfo()}
        </div>
        {this.renderLockIcon()}
      </header>
    );
  }
}

export default CallHeader;
