/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import Markdown from '../../Markdown/Markdown';
import styles from './Text.css';

export type Props = {|
  className?: string,
  text: string,
  isPending?: boolean
|};

class Service extends Component<Props> {
  shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.text !== nextProps.text ||
           this.props.isPending !== nextProps.isPending ||
           this.props.className !== nextProps.className;
  }

  render() {
    const className = classNames(
      styles.container,
      styles.service,
      this.props.className,
      this.props.isPending ? styles.pending : null
    );

    return (
      <Markdown className={className} text={this.props.text} />
    );
  }
}

export default Service;
