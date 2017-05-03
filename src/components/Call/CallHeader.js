/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */
import type { CallHeaderProps } from './types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CallAvatar from './CallAvatar';
import CallInfo from './CallInfo';
import Icon from '../Icon/Icon';
import styles from './CallHeader.css';

class CallHeader extends PureComponent {
  props: CallHeaderProps;

  render() {
    const { caller, call, duration, small, isHover } = this.props;
    const className = classNames(styles.container, {
      [styles.small]: small,
      [styles.hide]: !isHover
    });

    return (
      <header className={className}>
        <CallAvatar
          small={small}
          caller={caller}
        />
        <CallInfo
          small={small}
          call={call}
          caller={caller}
          duration={duration}
        />
        <Icon
          flat
          size={small ? 24 : 30}
          glyph={small ? 'maximize' : 'minimize'}
          className={styles.toggleSize}
          onClick={this.props.onSizeToggle}
        />
      </header>
    );
  }
}

export default CallHeader;
