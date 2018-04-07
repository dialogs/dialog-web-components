/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import Icon from '../Icon/Icon';
import classNames from 'classnames';
import styles from './ActivityList.css';

export type Props = {
  id?: string,
  className?: string,
  children: Node,
  icon?: ?{
    glyph: string,
    theme: ColorTheme
  },
  withoutArrow?: boolean,
  onClick?: (event: SyntheticMouseEvent<>) => mixed
};

class ActivityListItem extends PureComponent<Props> {
  renderIcon() {
    const { icon } = this.props;
    if (!icon) {
      return null;
    }

    return (
      <Icon
        inverted
        glyph={icon.glyph}
        theme={icon.theme}
        className={styles.icon}
        size={28}
      />
    );
  }

  renderArrow() {
    if (!this.props.onClick || this.props.withoutArrow) {
      return null;
    }

    return <Icon glyph="keyboard_arrow_right" className={styles.arrow} size={24} />;
  }

  render() {
    const className = classNames(
      styles.item,
      {
        [styles.clickable]: this.props.onClick
      },
      this.props.className
    );

    return (
      <div className={className} onClick={this.props.onClick} id={this.props.id}>
        {this.renderIcon()}
        <div className={styles.content}>
          {this.props.children}
        </div>
        {this.renderArrow()}
      </div>
    );
  }
}

export default ActivityListItem;
