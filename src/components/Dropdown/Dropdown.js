/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import styles from './Dropdown.css';

export type Props = {
  className?: string,
  children?: any,
  theme: 'primary' | 'secondary',
  style?: Object
};

class Dropdown extends PureComponent {
  props: Props;

  static defaultProps = {
    theme: 'primary'
  };

  render(): React.Element<any> {
    const { theme, style } = this.props;
    const className = classNames(styles.container, styles[theme], this.props.className);

    return (
      <CSSTransitionGroup
        transitionAppear
        transitionAppearTimeout={150}
        transitionEnter={false}
        transitionLeave={false}
        transitionName={{
          appear: styles.appear,
          appearActive: styles.appearActive
        }}
      >
        <div className={className} style={style}>
          {this.props.children}
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default Dropdown;
