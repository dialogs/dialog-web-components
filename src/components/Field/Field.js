/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import styles from './Field.css';

export type Props = {
  className?: string,
  children: Node
}

class Field extends PureComponent<Props> {
  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default Field;
