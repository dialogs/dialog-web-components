/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageContentText } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Markdown from '../../Markdown/Markdown';
import getInlineText from '../utils/getInlineText';
import decorators from '../utils/decorators';
import styles from '../SidebarRecentItem.css';

export type Props = {
  content: MessageContentText
};

class TextMessagePreview extends PureComponent {
  props: Props;

  render() {
    const { content } = this.props;

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

    return (
      <Markdown
        inline
        text={getInlineText(content.text)}
        decorators={decorators}
      />
    );
  }
}

export default TextMessagePreview;
