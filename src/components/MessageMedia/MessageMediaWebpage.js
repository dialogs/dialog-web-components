/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMediaWebsite } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Image from '../Image/Image';
import Markdown from '../Markdown/Markdown';
import styles from './MessageMedia.css';

export type Props = {
  className?: string,
  media: MessageMediaWebsite
};

class MessageMediaWebpage extends PureComponent {
  props: Props;

  renderTitle(): ?React.Element<any> {
    const { media: { content: { title } } } = this.props;

    if (!title) {
      return null;
    }

    return (
      <h4 className={styles.webpageTitle}>{title}</h4>
    );
  }

  renderDescription(): ?React.Element<any> {
    const { media: { content: { description } } } = this.props;

    if (!description) {
      return null;
    }

    return (
      <Markdown text={description} />
    );
  }

  renderImage(): ?React.Element<any> {
    const { media: { content: { image, title } } } = this.props;

    if (!image) {
      return null;
    }

    return (
      <Image
        className={styles.webpageImage}
        src={image.url}
        alt={title}
        width={image.width}
        height={image.height}
        maxWidth={200}
        maxHeight={100}
      />
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, styles.webpage, this.props.className);

    return (
      <blockquote className={className}>
        {this.renderTitle()}
        {this.renderDescription()}
        {this.renderImage()}
      </blockquote>
    );
  }
}

export default MessageMediaWebpage;
