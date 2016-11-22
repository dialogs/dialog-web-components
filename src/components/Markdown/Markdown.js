/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { parse, decorators } from '@dlghq/markdown';
import { renderBlocks } from './render';

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
    const tokens = parse(this.props.text, this.props.decorators);
    const markup = this.props.renderBlocks(tokens);

    return (
      <div className={this.props.className}>{markup}</div>
    );
  }
}

export default Markdown;
