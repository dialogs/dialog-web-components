/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import { parse, parseInline, decorators } from '@dlghq/markdown';
import { renderBlocks, renderText } from './render';
import styles from './Markdown.css';

export type Props = {
  className?: string,
  text: string,
  inline?: boolean,
  tagName?: string,
  decorators: typeof decorators,
  renderText: typeof renderText,
  renderBlocks: typeof renderBlocks,
  emojiSize: number
};

class Markdown extends Component {
  props: Props;

  static defaultProps = {
    decorators,
    renderText,
    renderBlocks,
    emojiSize: 18
  };

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.text !== this.props.text ||
           nextProps.className !== this.props.className;
  }

  render() {
    if (this.props.inline) {
      const TagName = this.props.tagName || 'span';
      const tokens = parseInline(this.props.text, this.props.decorators);
      const inlineClassName = classNames(styles.inline, this.props.className);

      return (
        <TagName className={inlineClassName}>
          {this.props.renderText(tokens, this.props.emojiSize, true)}
        </TagName>
      );
    }

    const TagName = this.props.tagName || 'div';
    const className = classNames(styles.container, this.props.className);
    const tokens = parse(this.props.text, this.props.decorators);

    return (
      <TagName className={className}>
        {this.props.renderBlocks(tokens)}
      </TagName>
    );
  }
}

export default Markdown;
