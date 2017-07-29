/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { BlockToken, TextToken } from '@dlghq/markdown/src/types';
import React from 'react';
import Emoji from '../Emoji/Emoji';
import styles from './Markdown.css';

export function renderText(tokens: TextToken[], emojiSize?: number = 20, isInline?: boolean): React.Element<any>[] {
  const result = [];

  for (let index = 0; index < tokens.length; index++) {
    const { content, highlight, options } = tokens[index];

    switch (highlight) {
      case 'link': {
        const url = (options && (options.url || options.href)) || content;
        const target = (options && options.target) || '_blank';

        result.push(
          <a
            key={index}
            className={styles.link}
            href={url}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {content}
          </a>
        );

        break;
      }

      case 'email':
        result.push(
          <a
            key={index}
            className={styles.link}
            href={`mailto:${content}`}
          >
            {content}
          </a>
        );

        break;

      case 'emoji':
        result.push(
          <Emoji
            key={index}
            char={content}
            size={emojiSize}
            inline={isInline}
          />
        );

        break;

      default: {
        const className = highlight ? styles[highlight] : null;

        result.push(
          <span key={index} className={className}>
            {content}
          </span>
        );

        break;
      }
    }
  }

  return result;
}

function containsOnlyEmoji(tokens: BlockToken[]): boolean {
  if (tokens.length === 1) {
    const token = tokens[0];
    if (token.type === 'paragraph') {
      return token.content.every((child) => child.highlight === 'emoji');
    }
  }

  return false;
}

export function renderBlocks(tokens: BlockToken[]): React.Element<any>[] {
  const result = [];

  const isOnlyEmoji = containsOnlyEmoji(tokens);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token.type) {
      case 'paragraph':
        if (token.content.length) {
          result.push(
            <p key={i} className={styles.paragraph}>
              {renderText(token.content, isOnlyEmoji ? 36 : 20)}
            </p>
          );
        } else {
          result.push(<br key={i} />);
        }

        break;

      case 'code_block':
        result.push(
          <pre key={i} className={styles.pre}>
            <code>{token.content}</code>
          </pre>
        );

        break;

      case 'blockquote':
        result.push(
          <blockquote key={i} className={styles.blockquote}>
            {renderBlocks(token.content)}
          </blockquote>
        );

        break;

      default:
        // do nothing
        break;
    }
  }

  return result;
}
