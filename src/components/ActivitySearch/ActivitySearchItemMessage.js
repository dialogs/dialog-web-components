/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message, PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';
import MessageContent from '../MessageContent/MessageContent';
import Icon from '../Icon/Icon';
import styles from './ActivitySearchItemMessage.css';

type Props = {
  className?: string,
  highlited: boolean,
  short: boolean,
  collapsed: boolean,
  info: PeerInfo,
  message: Message
};

class ActivitySearchItemMessage extends PureComponent {
  props: Props;

  rederCollapseToggler() {
    const { collapsed, highlited } = this.props;

    if (!highlited) {
      return null;
    }

    return (
      <Icon
        glyph={collapsed ? 'expand' : 'collapse'}
        size={18}
        className={styles.collapser}
      />
    );
  }

  renderAvatar() {
    const { message: { sender }, info } = this.props;
    const avatar = sender ? sender.avatar : info.avatar;
    const title = sender ? sender.title : info.title;
    const id = sender ? sender.peer.id : info.peer.id;
    const placeholder = getAvatarPlaceholder(id);

    return (
      <Avatar
        className={styles.avatar}
        image={avatar}
        title={title}
        placeholder={placeholder}
        size={30}
      />
    );
  }

  renderHeader() {
    const { message: { date, sender }, info } = this.props;
    const title = sender ? sender.title : info.title;

    return (
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <div className={styles.time}>{date}</div>
        {this.rederCollapseToggler()}
      </div>
    );
  }

  renderContent() {
    const { message: { rid, content } } = this.props;

    return (
      <MessageContent
        className={styles.content}
        rid={rid}
        content={content}
        maxHeight={100}
        maxWidth={100}
      />
    );
  }

  render() {
    const { highlited, short } = this.props;
    const className = classNames(styles.container, {
      [styles.highlited]: highlited,
      [styles.short]: short
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderAvatar()}
        <div className={styles.wrapper}>
          {this.renderHeader()}
          <div className={styles.contentWrapper}>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivitySearchItemMessage;
