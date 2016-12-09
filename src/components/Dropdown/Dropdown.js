/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
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
        transitionAppear={true}
        transitionAppearTimeout={150}
        transitionEnter={false}
        transitionLeave={false}
        transitionName={{
          appear: styles.appear,
          appearActive: styles.appearActive,
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
