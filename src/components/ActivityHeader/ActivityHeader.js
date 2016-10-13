/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ActivityHeader.css';

export type Props = {
  onClose?: () => any,
  onBack?: () => any,
  children: any,
  className?: string
};

class ActivityHeader extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.className !== this.props.className ||
           nextProps.onClose !== this.props.onClose ||
           nextProps.onBack !== this.props.onBack ||
           nextProps.children !== this.props.children;
  }

  renderBackButton(): ?React.Element<any> {
    if (!this.props.onBack) {
      return null;
    }

    return (
      <Icon onClick={this.props.onBack} className={styles.iconBack} glyph="arrow_back" />
    );
  }

  renderCloseButton(): ?React.Element<any> {
    if (!this.props.onClose) {
      return null;
    }

    return (
      <Icon onClick={this.props.onClose} className={styles.iconClose} glyph="close" />
    );
  }

  render(): React.Element<any> {
    const { children } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <header className={className}>
        {this.renderBackButton()}
        <div className={styles.text}>{children}</div>
        {this.renderCloseButton()}
      </header>
    );
  }
}

export default ActivityHeader;
