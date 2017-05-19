/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import styles from './Contact.css';

export type Props = {|
  name: string,
  photo64: string,
  phones: string[],
  emails: string[],
  maxWidth: number
|};

class Contact extends PureComponent {
  props: Props;

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

  renderAvatar(): ?React.Element<any> {
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

  renderEmails(): ?React.Element<any>[] {
    const { emails } = this.props;

    if (!emails.length) {
      return null;
    }

    return emails.map((email) => {
      return (
        <div className={styles.email} key={email}>
          <Icon glyph="mail_outline" className={styles.icon} />
          <a href={`mailto:${email}`} className={styles.link}>{email}</a>
        </div>
      );
    });
  }

  renderPhones(): ?React.Element<any>[] {
    const { phones } = this.props;

    if (!phones.length) {
      return null;
    }

    return phones.map((phone) => {
      return (
        <div className={styles.phone} key={phone}>
          <Icon glyph="phone_outline" className={styles.icon} />
          <a href={`tel:${phone}`} className={styles.link}>{phone}</a>
        </div>
      );
    });
  }


  render(): React.Element<any> {
    const { name, maxWidth } = this.props;
    const className = classNames(styles.container, {
      [styles.vertical]: maxWidth < 300
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
