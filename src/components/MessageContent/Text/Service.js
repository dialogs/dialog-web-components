/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Text.css';

export type Props = {|
  className?: string,
  text: string,
  isPending?: boolean
|};

class Service extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.text !== nextProps.text ||
           this.props.isPending !== nextProps.isPending ||
           this.props.className !== nextProps.className;
  }

  render(): React.Element<any> {
    const className = classNames(
      styles.container,
      styles.service,
      this.props.className,
      this.props.isPending ? styles.pending : null
    );

    return (
      <div className={className}>
        {this.props.text}
      </div>
    );
  }
}

export default Service;
