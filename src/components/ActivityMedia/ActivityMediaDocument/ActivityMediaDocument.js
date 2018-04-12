/*
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
import styles from './ActivityMediaDocument.css';

type Props = {
  title: ?string,
  size: ?string,
  sender?: ?string,
  extension: ?string,
  date?: ?Date
};

class ActivityMediaDocument extends PureComponent<Props> {
  context: ProviderContext;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  renderPreview() {
    const { extension } = this.props;

    return (
      <div className={styles.preview} title={extension}>
        <span className={styles.extension}>
          {extension}
        </span>
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    if (!title || title === '') {
      return <Text id="ActivityMedia.document" className={styles.title} tagName="div" />;
    }

    return (
      <div className={styles.title}>
        {title}
      </div>
    );
  }

  renderSender() {
    const { sender } = this.props;

    if (!sender) {
      return null;
    }

    return (
      <div className={styles.sender}>
        <PeerInfoTitle title={sender} emojiSize={13} />
      </div>
    );
  }

  renderSize() {
    const { size } = this.props;

    if (!size) {
      return null;
    }

    return <span>{size}</span>;
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

  render() {
    const { size, date, sender } = this.props;

    return (
      <div className={styles.container}>
        {this.renderPreview()}
        <div className={styles.meta}>
          {this.renderTitle()}
          <div className={styles.info}>
            {this.renderSize()}
            {size && date ? (
              <span>
                {'\u00A0'}-{'\u00A0'}
              </span>
            ) : null}
            {this.renderTimestamp()}
            {(size || date) && sender ? (
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

export default ActivityMediaDocument;
