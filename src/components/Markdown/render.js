/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import type { BlockToken, TextToken } from '@dlghq/markdown/src/types';
import React from 'react';
import Emoji from '../Emoji/Emoji';
import styles from './Markdown.css';

export function shrinkLink(link: string): string {
  if (link.length <= 50) {
    return link;
  }

  return link.slice(0, 30) + '…' + link.slice(link.length - 15);
}

export function renderText(tokens: TextToken[]): React.Element<any>[] {
  const result = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token.highlight) {
      case 'link':
        result.push(
          <a
            key={i}
            className={styles.link}
            href={token.content}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shrinkLink(token.content)}
          </a>
        );

        break;

      case 'emoji':
        result.push(
          <Emoji key={i} char={token.content} />
        );

        break;

      default: {
        const className = token.highlight ? styles[token.highlight] : null;

        result.push(
          <span key={i} className={className}>
            {token.content}
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
