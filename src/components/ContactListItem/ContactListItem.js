/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Contact } from '../ContactList/ContactList';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import styles from '../ContactList/ContactList.css';

export type Props = {
  contact: Contact,
  isSelected: boolean,
  onClick: (id: number) => void
};

class ContactListItem extends PureComponent {
  props: Props;
  handleClick: Function;

  constructor(props: Props): void {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(): void {
    this.props.onClick(this.props.contact.uid);
  }

  renderAbout(): ?React.Element<any> {
    const { contact: { about } } = this.props;

    if (!about) {
      return null;
    }

    return (
      <span className={styles.about}>{about}</span>
    );
  }

  renderText(): React.Element<any> {
    const { contact: { name } } = this.props;

    return (
      <div className={styles.text}>
        <span className={styles.name}>{name}</span>
        {this.renderAbout()}
      </div>
    );
  }

  renderStatus(): React.Element<any> {
    const { isSelected } = this.props;

    if (!isSelected) {
      return (
        <div className={styles.circle} />
      );
    }

    return (
      <div className={styles.selected}>
        <Icon glyph="done" className={styles.icon} />
      </div>
    );
  }

  render(): React.Element<any> {
    const { contact: { avatar, placeholder, name, isHovered } } = this.props;
    const className = classNames(styles.contact, {
      [styles.hovered]: isHovered,
      [styles.clickable]: this.props.onClick
    });

    return (
      <div className={className} onClick={this.handleClick}>
        <div className={styles.wrapper}>
          <Avatar
            className={styles.avatar}
            image={avatar}
            title={name}
            placeholder={placeholder}
            size="large"
          />
          {this.renderText()}
          {this.renderStatus()}
        </div>
      </div>
    );
  }
}

export default ContactListItem;
