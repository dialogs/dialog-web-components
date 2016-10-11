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
  contact: Contact
};

class ContactListItem extends PureComponent {
  props: Props;

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

  renderSelector(): React.Element<any> {
    const { contact: { isSelected } } = this.props;

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
      [styles.hovered]: isHovered
    });

    return (
      <div className={className}>
        <div className={styles.wrapper}>
          <Avatar
            className={styles.avatar}
            image={avatar}
            title={name}
            placeholder={placeholder}
            size="large"
          />
          {this.renderText()}
          {this.renderSelector()}
        </div>
      </div>
    );
  }
}

export default ContactListItem;
