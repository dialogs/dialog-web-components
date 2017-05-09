/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props as CallInfoProps } from '../CallInfo/CallInfo';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CallAvatar from '../CallAvatar/CallAvatar';
import CallInfo from '../CallInfo/CallInfo';
import Icon from '../Icon/Icon';
import styles from './CallHeader.css';

export type Props = CallInfoProps & {
  isHover: boolean,
  onSizeToggle: () => void
};

class CallHeader extends PureComponent {
  props: Props;

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
          isAudioCall={false}
        />
        <CallInfo
          small={small}
          isAudioCall={false}
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
