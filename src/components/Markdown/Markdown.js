/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import { parse, decorators } from '@dlghq/markdown';
import { renderBlocks } from './render';
import styles from './Markdown.css';

export type Props = {
  className?: string,
  text: string,
  decorators: typeof decorators,
  renderBlocks: typeof renderBlocks
};

class Markdown extends Component {
  props: Props;
  static defaultProps = {
    decorators,
    renderBlocks
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.text !== this.props.text ||
           nextProps.className !== this.props.className;
  }

  render(): React.Element<any> {
    const className = classNames(styles.className, styles.container);
    const tokens = parse(this.props.text, this.props.decorators);

    return (
      <div className={className}>
        {this.props.renderBlocks(tokens)}
      </div>
    );
  }
}

export default Markdown;
