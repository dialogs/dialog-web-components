/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { BlockToken, TextToken } from '@dlghq/markdown/src/types';
import React from 'react';
import Emoji from '../Emoji/Emoji';
import styles from './Markdown.css';

export function renderText(tokens: TextToken[]): React.Element<any>[] {
  const result = [];

  for (let index = 0; index < tokens.length; index++) {
    const { content, highlight, options } = tokens[index];

    switch (highlight) {
      case 'link': {
        const href = (options && options.href) ? options.href : content;

        result.push(
          <a
            key={index}
            className={styles.link}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        );

        break;
      }

      case 'emoji':
        result.push(
          <Emoji key={index} char={content} />
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

export function renderBlocks(tokens: BlockToken[]): React.Element<any>[] {
  const result = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token.type) {
      case 'paragraph':
        if (token.content.length) {
          result.push(
            <p key={i} className={styles.paragraph}>
              {renderText(token.content)}
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
