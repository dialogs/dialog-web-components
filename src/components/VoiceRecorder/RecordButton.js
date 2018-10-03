/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './RecordButton.css';

export type Props = {
  className?: string,
  onClick?: (event: SyntheticEvent<>) => mixed
};

class RecordButton extends PureComponent<Props> {
  render() {
    const { onClick } = this.props;
    const className = classNames(styles.button, this.props.className);

    return (
      <div className={className}>
        <Icon glyph="mic_material" className={styles.icon} size={28} onClick={onClick} />
      </div>
    );
  }
}

export default RecordButton;
