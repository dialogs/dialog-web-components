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
        className={styles.content}
        rid={rid}
        content={content}
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
