/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';

import Icon from '../../Icon/Icon';
import styles from './Contact.css';

export type Props = {|
  name: string,
  photo64: string,
  phones: string[],
  emails: string[],
  maxWidth: number,
|};

class Contact extends PureComponent<Props> {
  getAvatarSize = (): number => {
    const { maxWidth } = this.props;

    if (maxWidth < 300) {
      return 80;
    }

    if (maxWidth < 400) {
      return 64;
    }

    return 96;
  };

  renderAvatar() {
    const { name, photo64 } = this.props;

    if (!photo64) {
      return null;
    }

    const size = this.getAvatarSize();

    return (
      <img
        src={`data:image/jpeg;base64,${photo64}`}
        alt={name}
        className={styles.avatar}
        style={{ width: size, height: size }}
      />
    );
  }

  renderEmails(): Node {
    const { emails } = this.props;

    if (!emails.length) {
      return null;
    }

    return emails.map((email, index) => {
      return (
        <div className={styles.email} key={`${index}_${email}`}>
          <Icon glyph="mail_outline" className={styles.icon} size={22} />
          <a href={`mailto:${email}`} className={styles.link}>
            {email}
          </a>
        </div>
      );
    });
  }

  renderPhones(): Node {
    const { phones } = this.props;

    if (!phones.length) {
      return null;
    }

    return phones.map((phone, index) => {
      return (
        <div className={styles.phone} key={`${index}_${phone}`}>
          <Icon glyph="phone_outline" className={styles.icon} size={22} />
          <a href={`tel:${phone}`} className={styles.link}>
            {phone}
          </a>
        </div>
      );
    });
  }

  render() {
    const { name, maxWidth } = this.props;
    const className = classNames(styles.container, {
      [styles.vertical]: maxWidth < 300,
    });

    return (
      <div className={className} style={{ width: maxWidth }}>
        {this.renderAvatar()}
        <div className={styles.credentials}>
          <div className={styles.name}>{name}</div>
          {this.renderPhones()}
          {this.renderEmails()}
        </div>
      </div>
    );
  }
}

export default Contact;
