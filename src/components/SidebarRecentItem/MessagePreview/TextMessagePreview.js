/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentText, MessageAttachment } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Markdown from '../../Markdown/Markdown';
import getInlineText from '../utils/getInlineText';
import decorators from '../utils/decorators';
import styles from '../SidebarRecentItem.css';

export type Props = {
  className?: string,
  content: MessageContentText,
  attachment?: ?MessageAttachment,
  emojiSize: number,
  decorators?: typeof decorators
};

class TextMessagePreview extends PureComponent<Props> {
  static defaultProps = {
    decorators
  };

  render() {
    const { content, attachment } = this.props;

    if (content.text.startsWith('```')) {
      return (
        <Text className={styles.highlight} id="SidebarRecentItem.code" />
      );
    }

    if (content.text.startsWith('>')) {
      return (
        <Text className={styles.highlight} id="SidebarRecentItem.quote" />
      );
    }

    if (content.text === '' && attachment) {
      if (attachment.type === 'forward') {
        return (
          <Text className={styles.highlight} id="SidebarRecentItem.forwarded" />
        );
      } else if (attachment.type === 'reply') {
        return (
          <Text className={styles.highlight} id="SidebarRecentItem.reply" />
        );
      }
    }

    return (
      <Markdown
        className={this.props.className}
        inline
        text={getInlineText(content.text)}
        decorators={this.props.decorators}
        emojiSize={this.props.emojiSize}
      />
    );
  }
}

export default TextMessagePreview;
