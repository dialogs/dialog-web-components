/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './Presence.css';

export type PresenceType = 'unset' | 'away' | 'do_not_disturb' | 'invisible';

type Props = {
  className?: string,
  dotClassName?: string,
  statusClassName?: string,
  status: PresenceType
};

class Presence extends PureComponent<Props> {
  static defaultProps = {
    size: 'normal'
  };

  render() {
    const className = classNames(styles.container, this.props.className);
    const dotClassName = classNames(styles.dot, styles[this.props.status], this.props.dotClassName);
    const statusClassName = classNames(styles.status, this.props.statusClassName);

    return (
      <div className={className}>
        <div className={dotClassName} />
        <Text id={`Presence.${this.props.status}`} className={statusClassName} />
      </div>
    );
  }
}

export default Presence;
