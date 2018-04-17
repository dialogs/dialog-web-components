/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './Dropdown.css';

export type Props = {
  className?: string,
  children: Node,
  theme: 'primary' | 'secondary',
  style?: Object,
  submenu?: boolean
};

class Dropdown extends PureComponent<Props> {
  static defaultProps = {
    theme: 'primary',
    submenu: false
  };

  render() {
    const { theme, style } = this.props;
    const className = classNames(styles.container, styles[theme], this.props.className);

    const animationClassNames = this.props.submenu
      ? {
        appear: styles.subAppear,
        appearActive: styles.subAppearActive
      }
      : {
        appear: styles.appear,
        appearActive: styles.appearActive
      };

    return (
      <TransitionGroup>
        <CSSTransition appear timeout={{ appear: 150 }} classNames={animationClassNames}>
          <div className={className} style={style}>
            {this.props.children}
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default Dropdown;
