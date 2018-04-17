/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ColorTheme } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import Icon from '../Icon/Icon';
import Switcher from '../Switcher/Switcher';
import classNames from 'classnames';
import styles from './ActivityList.css';

export type Props = {
  id: string,
  className?: string,
  children: Node,
  icon?: ?{
    glyph: string,
    theme: ColorTheme
  },
  value: boolean,
  onChange: (value: boolean) => void
};

class ActivityListSwitcher extends PureComponent<Props> {
  handleClick = (event: SyntheticEvent<>): void => {
    event.preventDefault();
    this.props.onChange(!this.props.value);
  };

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

  render() {
    const className = classNames(styles.item, styles.clickable, this.props.className);

    return (
      <div className={className} onClick={this.handleClick} id={this.props.id}>
        {this.renderIcon()}
        <div className={styles.content}>
          {this.props.children}
        </div>
        <Switcher
          id={`${this.props.id}_switcher`}
          name={`${this.props.id}_switcher`}
          value={this.props.value}
          className={styles.switcher}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default ActivityListSwitcher;
