/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
import React, { PureComponent } from 'react';
import Icon from '../../Icon/Icon';
import styles from './Contact.css';

export type Props = {|
  name: string,
  photo64: string,
  phones: string[],
  emails: string[]
|};

class Contact extends PureComponent {
  props: Props;

  renderAvatar(): ?React.Element<any> {
    const { name, photo64 } = this.props;

    if (!photo64) {
      return null;
    }

    return (
      <img src={`data:image/jpeg;base64,${photo64}`} alt={name} className={styles.avatar} />
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
          <Icon glyph="phone" className={styles.icon} />
          <a href={`tel:${phone}`} className={styles.link}>{phone}</a>
        </div>
      );
    });
  }


  render(): React.Element<any> {
    const { name } = this.props;

    return (
      <div className={styles.container}>
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
