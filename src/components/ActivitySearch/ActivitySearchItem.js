/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ActivitySearchItemProps as Props } from './types';
import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { find, findIndex } from 'lodash';
import { format } from 'date-fns';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import ActivitySearchItemMessage from './ActivitySearchItemMessage';
import Icon from '../Icon/Icon';
import styles from './ActivitySearchItem.css';

type State = {
  collapsed: boolean
};

class ActivitySearchItem extends PureComponent {
  props: Props;
  state: State;

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true
    };
  }

  handleJumpToMessage = () => {
    console.log('handleJumpToMessage');
  };

  handleCollapseToggle = () => {
    this.setState(({ collapsed }) => {
      return {
        collapsed: !collapsed
      };
    });
  };

  renderHeader() {
    const { info: { title }, messages, focus } = this.props;
    const focusMessage = find(messages, (message) => message.rid === focus);
    const messageDate = format(focusMessage.fullDate, 'DD.MM.YY');

    return (
      <div className={styles.header}>
        <div className={styles.headerTitle}>{title}</div>
        <div className={styles.headerInfo}>
          <time dateTime={focusMessage.fullDate.toISOString()}>{messageDate}</time>
          ・
          <Text
            id="ActivitySearch.jump"
            className={styles.headerInfoJump}
            onClick={this.handleJumpToMessage}
          />
        </div>
      </div>
    );
  }

  renderCollapsedMessages() {
    const { messages, focus } = this.props;
    const focusedIndex = findIndex(messages, (message) => message.rid === focus);
    const collapsedMessages = [];

    if (focusedIndex > 0) {
      collapsedMessages.push(messages[focusedIndex - 1]);
    }
    collapsedMessages.push(messages[focusedIndex]);
    if (focusedIndex < messages.length - 1) {
      collapsedMessages.push(messages[focusedIndex + 1]);
    }

    return collapsedMessages.map((message) => {
      return (
        <ActivitySearchItemMessage
          key={message.rid}
          message={message}
          highlited={message.rid === focus}
          short
          collapsed
        />
      );
    });
  }

  renderMessages() {
    const { messages, focus } = this.props;

    if (this.state.collapsed) {
      return this.renderCollapsedMessages();
    }

    return messages.map((message) => {
      return (
        <ActivitySearchItemMessage
          key={message.rid}
          message={message}
          highlited={message.rid === focus}
          short={false}
          collapsed={false}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);
    const messagesClassName = classNames(this.state.collapsed ? styles.messagesCollapsed : styles.messages);

    return (
      <div className={className}>
        {this.renderHeader()}
        <div className={messagesClassName} onClick={this.handleCollapseToggle}>
          <CSSTransitionGroup
            transitionName={{
              enter: styles.enter,
              enterActive: styles.enterActive
            }}
            transitionEnter
            transitionEnterTimeout={100}
            transitionLeave={false}
          >
            {this.renderMessages()}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default ActivitySearchItem;
