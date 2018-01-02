/**
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
  style?: Object
};

class Dropdown extends PureComponent<Props> {
  static defaultProps = {
    theme: 'primary'
  };

  render() {
    const { theme, style } = this.props;
    const className = classNames(
      styles.container,
      styles[theme],
      this.props.className
    );

    return (
      <TransitionGroup>
        <CSSTransition
          appear
          timeout={{ appear: 150 }}
          classNames={{
            appear: styles.appear,
            appearActive: styles.appearActive
          }}
        >
          <div className={className} style={style}>
            {this.props.children}
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default Dropdown;
