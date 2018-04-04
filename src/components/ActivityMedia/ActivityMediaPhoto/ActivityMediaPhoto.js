/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import type { ProviderContext } from '@dlghq/react-l10n';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import formatDate from 'date-fns/format';
import getLocalDateTimeFormat from '../../../utils/getLocalDateTimeFormat';
import getDateFnsLocale from '../../../utils/getDateFnsLocale';
import styles from './ActivityMediaPhoto.css';

type Props = {
  photo: ?string,
  preview: ?string,
  sender: ?string,
  title: ?string,
  date?: ?Date,
  onClick: () => mixed
};

class ActivityMediaPhoto extends PureComponent<Props> {
  context: ProviderContext;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  renderTitle() {
    const { title } = this.props;

    if (!title || title === '') {
      return <Text id="ActivityMedia.photo" className={styles.title} tagName="div" />;
    }

    return <div className={styles.title}>{title}</div>;
  }

  renderTimestamp() {
    const { date } = this.props;

    if (!date) {
      return null;
    }

    const format = getLocalDateTimeFormat(this.context.l10n.locale);
    const locale = getDateFnsLocale(this.context.l10n.locale);

    return (
      <time className={styles.time} dateTime={date.toISOString()}>
        {formatDate(date, format, locale)}
      </time>
    );
  }

  renderSender() {
    const { sender } = this.props;

    if (!sender) {
      return null;
    }

    return <PeerInfoTitle title={sender} emojiSize={13} />;
  }

  render() {
    const { preview, photo, sender, date } = this.props;

    return (
      <div className={styles.container}>
        {photo && preview ? (
          <div className={styles.preview} style={{ backgroundImage: `url(${preview})` }} onClick={this.props.onClick}>
            <div className={styles.photo} style={{ backgroundImage: `url(${photo})` }} />
          </div>
        ) : null}
        <div className={styles.meta}>
          {this.renderTitle()}
          <div className={styles.info}>
            {this.renderTimestamp()}
            {sender && date ? (
              <span>
                {'\u00A0'}-{'\u00A0'}
              </span>
            ) : null}
            {this.renderSender()}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityMediaPhoto;
