/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './PadFooter.css';
import Button from './../../Button/Button';
import Icon from './../../Icon/Icon';

export type Props = {
  className?: string,
  onCallClick?: () => mixed
};

class PadFooter extends PureComponent<Props> {
  render() {
    const className = classNames(styles.container, this.props.className);

    if (!this.props.onCallClick) {
      return null;
    }

    return (
      <div className={className}>
        <Button theme="success" wide className={styles.button} onClick={this.props.onCallClick}>
          <Icon glyph="phone_outline" className={styles.buttonIcon} size={26} />
        </Button>
      </div>
    );
  }
}

export default PadFooter;
