/*
 * Copyright 2018 dialog LLC <info@dlg.im>
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
  media: MessageMediaWebsite,
  maxWidth: number
};

class MessageMediaWebpage extends PureComponent<Props> {
  renderTitle() {
    const { media: { content: { title } } } = this.props;

    if (!title) {
      return null;
    }

    return (
      <h4 className={styles.webpageTitle}>
        {title}
      </h4>
    );
  }

  renderDescription() {
    const { media: { content: { description } } } = this.props;

    if (!description) {
      return null;
    }

    return (
      <Markdown
        className={styles.webpageDescription}
        text={description}
        emojiSize={18}
        inline
        tagName="div"
      />
    );
  }

  renderImage() {
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

  renderURL() {
    const { media: { content: { url } } } = this.props;

    if (!url) {
      return null;
    }

    return (
      <a className={styles.webpageLink} href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    );
  }

  render() {
    const className = classNames(styles.container, styles.webpage, {
      [styles.vertical]: this.props.maxWidth < 400
    }, this.props.className);

    return (
      <blockquote className={className}>
        {this.renderImage()}
        <div className={styles.webpageWrapper}>
          {this.renderTitle()}
          {this.renderDescription()}
          {this.renderURL()}
        </div>
      </blockquote>
    );
  }
}

export default MessageMediaWebpage;
