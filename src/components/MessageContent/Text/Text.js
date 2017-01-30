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
  media?: ?MessageMediaType,
  service?: boolean,
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

  render(): React.Element<any> {
    const className = classNames(
      styles.container,
      this.props.className,
      this.props.service ? styles.service : null,
      this.props.isPending ? styles.pending : null
    );

    if (this.props.service) {
      return (
        <div className={className}>
          {this.props.text}
        </div>
      );
    }

    if (this.props.media) {
      return (
        <div className={className}>
          <Markdown className={styles.wrapper} text={this.props.text} />
          <MessageMedia media={this.props.media} />
        </div>
      );
    }

    return (
      <Markdown className={className} text={this.props.text} />
    );
  }
}

export default Text;
