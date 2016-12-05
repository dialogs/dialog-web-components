/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMedia as MessageMediaType } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import MessageMedia from '../../MessageMedia/MessageMedia';
import Markdown from '../../Markdown/Markdown';
import styles from './Text.css';

export type Props = {
  text: string,
  media: ?MessageMediaType,
  service?: boolean,
  className?: string
}

class Text extends Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.className !== nextProps.className ||
           this.props.text !== nextProps.text ||
           this.props.media !== nextProps.media;
  }

  render(): React.Element<any> {
    if (this.props.service) {
      const className = classNames(styles.container, styles.service, this.props.className);

      return (
        <div className={className}>
          {this.props.text}
        </div>
      );
    }

    const className = classNames(styles.container, this.props.className);

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
