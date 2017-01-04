/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { BlockToken, TextToken } from '@dlghq/markdown/src/types';
import React from 'react';
import Emoji from '../Emoji/Emoji';

export function renderText(tokens: TextToken[]): React.Element<any>[] {
  const result = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token.highlight) {
      case 'link':
        result.push(
          <a key={i} href={token.content} target="_blank" rel="noopener noreferrer">
            {token.content}
          </a>
        );

        break;

      case 'emoji':
        result.push(
          <Emoji char={token.content} />
        );

        break;

      default:
        result.push(
          <span key={i} className={token.highlight}>
            {token.content}
          </span>
        );

        break;
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
            <p key={i}>
              {renderText(token.content)}
            </p>
          );
        } else {
          result.push(<br key={i} />);
        }

        break;

      case 'code_block':
        result.push(
          <pre key={i}>
            <code>{token.content}</code>
          </pre>
        );

        break;

      case 'blockquote':
        result.push(
          <blockquote key={i}>
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
