/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMedia as MessageMediaType } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import MessageMedia from '../../MessageMedia/MessageMedia';
import Markdown from '../../Markdown/Markdown';
import styles from './Text.css';

export type Props = {|
  className?: string,
  text: string,
  media: MessageMediaType[],
  isPending?: boolean
|};

class Text extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.text !== nextProps.text ||
           this.props.media !== nextProps.media ||
           this.props.isPending !== nextProps.isPending ||
           this.props.className !== nextProps.className;
  }

  render() {
    const className = classNames(
      styles.container,
      this.props.className,
      this.props.isPending ? styles.pending : null
    );

    const markdown = (
      <Markdown className={className} text={this.props.text} />
    );

    if (this.props.media.length) {
      const media = this.props.media.map((item, key) => {
        return (
          <MessageMedia
            key={key} // eslint-disable-line
            media={item}
          />
        );
      });

      return (
        <div className={className}>
          {markdown}
          {media}
        </div>
      );
    }

    return markdown;
  }
}

export default Text;
