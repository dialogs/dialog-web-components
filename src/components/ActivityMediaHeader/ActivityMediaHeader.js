/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Trigger from '../Trigger/Trigger';
import Dropdown from '../Dropdown/Dropdown';
import ActivityMediaHeaderItem from './ActivityMediaHeaderItem';
import styles from './ActivityMediaHeader.css';
import { Text } from '@dlghq/react-l10n';

export type Props = {
  className?: string,
  current: string,
  onClose?: () => mixed,
  onBack?: () => mixed,
  onChange?: (type: string) => mixed
};

const MEDIA_TYPES = [
  'all',
  'photo',
  'document',
  'voice',
  'video'
];

class ActivityMediaHeader extends PureComponent<Props> {
  renderTrigger = (handlers: Object, isActive: boolean) => {
    const { current } = this.props;
    const className = classNames(styles.current, {
      [styles.currentActive]: isActive
    });

    return (
      <div className={className} {...handlers} id="activity_media_header_type_current">
        <Text id={`ActivityMediaHeader.${current}`} className={styles.currentText} />
        <Icon
          className={styles.arrow}
          glyph={isActive ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          size={24}
        />
      </div>
    );
  };

  renderMenu = () => {
    const { current } = this.props;

    const children = MEDIA_TYPES.map((type) => {
      if (current === type) {
        return null;
      }

      return (
        <ActivityMediaHeaderItem
          key={type}
          type={type}
          id={`activity_media_header_type_${type}`}
          onClick={this.props.onChange}
        />
      );
    });

    return (
      <Dropdown>
        {children}
      </Dropdown>
    );
  };

  renderBackButton() {
    if (!this.props.onBack) {
      return null;
    }

    return (
      <Icon
        onClick={this.props.onBack}
        className={styles.iconBack}
        glyph="arrow_back"
        id="activity_media_header_back_button"
      />
    );
  }

  renderCloseButton() {
    if (!this.props.onClose) {
      return null;
    }

    return (
      <Icon
        onClick={this.props.onClose}
        className={styles.iconClose}
        glyph="close"
        id="activity_media_header_close_button"
      />
    );
  }

  renderCurrent() {
    const options = {
      attachment: 'top center',
      targetAttachment: 'bottom center',
      constraints: [
        {
          to: 'window',
          attachment: 'together',
          pin: true
        }
      ],
      targetOffset: '10px 0'
    };

    return (
      <Trigger
        options={options}
        renderTrigger={this.renderTrigger}
        renderChild={this.renderMenu}
        openHandler={['onClick']}
        closeHandler={['onClick']}
        closeOnDocumentClick
        closeOnDocumentScroll
      />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <header className={className}>
        {this.renderBackButton()}
        {this.renderCurrent()}
        {this.renderCloseButton()}
      </header>
    );
  }
}

export default ActivityMediaHeader;
