/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import { format } from 'date-fns';
import { Text } from '@dlghq/react-l10n';
import { hasSelection } from '@dlghq/dialog-utils';
import classNames from 'classnames';

import ActivitySearchItemMessage from '../ActivitySearchItemMessage/ActivitySearchItemMessage';
import styles from './ActivitySearchItem.css';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';

type Props = {
  className?: string,
  info: PeerInfo,
  focus: Message,
  before: Message[],
  after: Message[],
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (peer: Peer, message: Message) => mixed,
};

type State = {
  collapsed: boolean,
};

class ActivitySearchItem extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  handleGoToPeer = () => {
    this.props.onGoToPeer(this.props.info.peer);
  };

  handleJumpToMessage = () => {
    this.props.onGoToMessage(this.props.info.peer, this.props.focus);
  };

  handleCollapseToggle = () => {
    if (!hasSelection()) {
      this.setState(({ collapsed }) => {
        return {
          collapsed: !collapsed,
        };
      });
    }
  };

  renderHeader() {
    const { info, focus } = this.props;
    const messageDate = format(focus.fullDate, 'DD.MM.YY');

    return (
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <PeerInfoTitle
            title={info.title}
            onTitleClick={this.handleGoToPeer}
          />
        </div>
        <div className={styles.headerInfo} onClick={this.handleJumpToMessage}>
          <time dateTime={focus.fullDate.toISOString()}>{messageDate}</time>
          {'・'}
          <Text id="ActivitySearch.jump" className={styles.headerInfoJump} />
        </div>
      </div>
    );
  }

  renderBeforeMessages(): Node {
    const { info, before } = this.props;

    if (!before.length) {
      return null;
    }

    if (this.state.collapsed) {
      return (
        <ActivitySearchItemMessage
          info={info}
          message={before[before.length - 1]}
          highlighted={false}
          short
          collapsed
        />
      );
    }

    return before.map((message) => {
      return (
        <ActivitySearchItemMessage
          key={message.rid}
          info={info}
          message={message}
          highlighted={false}
          short={false}
          collapsed={false}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
        />
      );
    });
  }

  renderFocusMessage(): Node {
    const { info, focus } = this.props;

    return (
      <ActivitySearchItemMessage
        info={info}
        message={focus}
        highlighted
        short={this.state.collapsed}
        collapsed={this.state.collapsed}
        onGoToPeer={this.props.onGoToPeer}
        onGoToMessage={this.props.onGoToMessage}
      />
    );
  }

  renderAfterMessages(): Node {
    const { info, after } = this.props;

    if (!after.length) {
      return null;
    }

    if (this.state.collapsed) {
      return (
        <ActivitySearchItemMessage
          info={info}
          message={after[0]}
          highlighted={false}
          short
          collapsed
        />
      );
    }

    return after.map((message) => {
      return (
        <ActivitySearchItemMessage
          info={info}
          key={message.rid}
          message={message}
          highlighted={false}
          short={false}
          collapsed={false}
          onGoToPeer={this.props.onGoToPeer}
          onGoToMessage={this.props.onGoToMessage}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);
    const messagesClassName = classNames(
      this.state.collapsed ? styles.messagesCollapsed : styles.messages,
    );

    return (
      <div className={className}>
        {this.renderHeader()}
        <div className={messagesClassName} onClick={this.handleCollapseToggle}>
          {this.renderBeforeMessages()}
          {this.renderFocusMessage()}
          {this.renderAfterMessages()}
        </div>
      </div>
    );
  }
}

export default ActivitySearchItem;
