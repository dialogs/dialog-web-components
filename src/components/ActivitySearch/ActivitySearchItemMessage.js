/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message } from '@dlghq/dialog-types';
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
  message: Message,
  onCollapseToggle?: () => any
};

class ActivitySearchItemMessage extends PureComponent {
  props: Props;

  renderAvatar() {
    const { message: { sender: { avatar, title, peer: { id } } } } = this.props;
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

  rederCollapseToggler() {
    const { collapsed, highlited } = this.props;

    if (!highlited) {
      return null;
    }

    return (
      <Icon
        onClick={this.props.onCollapseToggle}
        glyph={collapsed ? 'expand' : 'collapse'}
        size={18}
        className={styles.collapser}
      />
    );
  }

  renderHeader() {
    const { message: { date, sender: { title } } } = this.props;

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
        rid={rid}
        content={content}
      />
    );
  }

  render() {
    const { highlited, short, collapsed } = this.props;
    const className = classNames(styles.container, {
      [styles.highlited]: highlited && collapsed,
      [styles.short]: short
    }, this.props.className);

    return (
      <div className={className}>
        {this.renderAvatar()}
        <div className={styles.wrapper}>
          {this.renderHeader()}
          <div className={styles.content}>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivitySearchItemMessage;
