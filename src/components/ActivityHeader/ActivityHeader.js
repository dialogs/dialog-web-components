/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ActivityHeader.css';

export type Props = {
  onClose?: () => mixed,
  onBack?: () => mixed,
  children?: Node,
  className?: string
};

class ActivityHeader extends PureComponent<Props> {
  renderBackButton() {
    if (!this.props.onBack) {
      return null;
    }

    return (
      <div onClick={this.props.onBack} className={styles.iconCloseWrapper}>
        <Icon id="activity_header_back_button" className={styles.icon} glyph="arrow_back" />
      </div>
    );
  }

  renderCloseButton() {
    if (!this.props.onClose) {
      return null;
    }

    return (
      <div onClick={this.props.onClose} className={styles.iconCloseWrapper}>
        <Icon id="activity_header_close_button" className={styles.icon} glyph="close" />
      </div>
    );
  }

  render() {
    const { children } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <header className={className}>
        {this.renderBackButton()}
        {children}
        {this.renderCloseButton()}
      </header>
    );
  }
}

export default ActivityHeader;
