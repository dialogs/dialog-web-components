/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Map } from 'immutable';
import type { PeerInfo, MessageReaction as MessageReactionType } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import { getEmojiByChar } from '@dlghq/emoji';
import { peerToString } from '@dlghq/dialog-types/utils';
import Tooltip from '../Tooltip/Tooltip';
import EmojiButton from '../EmojiButton/EmojiButton';

type Props = {
  className?: string,
  users: Map<number, PeerInfo>,
  reaction: MessageReactionType,
  onToggle: (char: string) => mixed
}

class MessageReaction extends PureComponent {
  props: Props;

  renderTooltip() {
    const { users, reaction } = this.props;
    const children = [];

    if (reaction.isOwnSet) {
      children.push(<Text key="you" id="MessageReaction.you" tagName="b" />);
    }

    for (let i = 0; i < reaction.uids.length; i++) {
      const user = users.get(reaction.uids[i]);
      if (user) {
        const nickname = user.userName ? '@' + user.userName : user.title;

        if (children.length > 0) {
          children.push(<span key={i}>, </span>);
        }
        children.push(<b key={peerToString(user.peer)}>{nickname}</b>);
      }
    }

    const emoji = getEmojiByChar(reaction.code);
    const name = (emoji ? emoji.name : null) || 'unknown';

    return (
      <span>
        {children}
        <Text id="MessageReaction.reacted" values={{ emoji: name }} />
      </span>
    );
  }

  render() {
    const { className, reaction } = this.props;

    return (
      <Tooltip text={this.renderTooltip()}>
        <EmojiButton
          className={className}
          count={reaction.count}
          char={reaction.code}
          active={reaction.isOwnSet}
          onClick={this.props.onToggle}
        />
      </Tooltip>
    );
  }
}

export default MessageReaction;
