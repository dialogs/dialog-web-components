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
      <Icon
        onClick={this.props.onBack}
        id="activity_header_back_button"
        className={styles.iconBack}
        glyph="arrow_back"
        size={24}
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
        id="activity_header_close_button"
        className={styles.iconClose}
        glyph="close"
        size={24}
      />
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
