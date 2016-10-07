/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Tabs.css';

export type Props = {
  className?: string,
  children: any
}

class Tabs extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <ul className={className}>
        {this.props.children}
      </ul>
    );
  }
}

export default Tabs;
