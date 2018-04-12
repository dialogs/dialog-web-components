/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import PeerInfoTitle from '../../PeerInfoTitle/PeerInfoTitle';
import formatDate from 'date-fns/format';
import getLocalDateTimeFormat from '../../../utils/getLocalDateTimeFormat';
import getDateFnsLocale from '../../../utils/getDateFnsLocale';
import classNames from 'classnames';
import Icon from '../../Icon/Icon';
import styles from './ActivityMediaVideo.css';
import getHumanTime from '../../../utils/getHumanTime';

type Props = {
  title: ?string,
  size: ?string,
  preview: ?string,
  duration: ?number,
  date?: ?Date,
  sender: ?string
};

class ActivityMediaVideo extends PureComponent<Props> {
  context: ProviderContext;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  renderPreview() {
    const className = classNames(styles.preview, {
      [styles.previewEmpty]: !this.props.preview
    });

    return (
      <div className={className} style={this.props.preview ? { backgroundImage: `url(${this.props.preview})` } : {}}>
        <Icon glyph="play_arrow" size={22} className={styles.play} />
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    if (!title || title === '') {
      return <Text id="ActivityMedia.video" className={styles.title} tagName="div" />;
    }

    return (
      <div className={styles.title}>
        {title}
      </div>
    );
  }

  renderDuration() {
    const { duration } = this.props;

    if (!duration) {
      return null;
    }

    return (
      <span>
        {getHumanTime(duration * 10)}
      </span>
    );
  }

  renderSize() {
    const { size } = this.props;

    if (!size) {
      return null;
    }

    return (
      <span>
        {size}
      </span>
    );
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
    const { duration, size, sender, date } = this.props;

    return (
      <div className={styles.container}>
        {this.renderPreview()}
        <div className={styles.meta}>
          {this.renderTitle()}
          <div className={styles.info}>
            {this.renderDuration()}
            {duration && date ? (
              <span>
                {'\u00A0-\u00A0'}
              </span>
            ) : null}
            {this.renderTimestamp()}
            {date && size ? (
              <span>
                {'\u00A0-\u00A0'}
              </span>
            ) : null}
            {this.renderSize()}
            {(date || size || duration) && sender ? (
              <span>
                {'\u00A0-\u00A0'}
              </span>
            ) : null}
            {this.renderSender()}
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityMediaVideo;
