/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Markdown from '../Markdown/Markdown';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';
import styles from './DiscoverCard.css';

export type Card = {
  type: 'user' | 'bot' | 'group' | 'channel',
  title: string,
  shortname: ?string,
  description: ?string,
  avatar: ?string,
  peer: Peer,
  joined?: boolean,
  members?: number,
  creator?: string
};

export type Props = Card & {
  className?: string,
  onGoToPeer: (peer: Peer) => mixed
};

class DiscoverCard extends PureComponent<Props> {
  handleClick = () => {
    this.props.onGoToPeer(this.props.peer);
  };

  renderAvatar() {
    const { avatar, title, peer: { id } } = this.props;
    const placeholder = getAvatarPlaceholder(id);

    return (
      <div className={styles.side}>
        <Avatar
          title={title} image={avatar} placeholder={placeholder} size={80}
          className={styles.avatar}
        />
      </div>
    );
  }

  renderMembers() {
    const { members } = this.props;

    if (!members) {
      return null;
    }

    return (
      <div className={styles.members}>
        <Icon glyph="person" className={styles.membersIcon} size={20} />
        {members}
      </div>
    );
  }

  renderCreator() {
    const { type, creator } = this.props;

    if (!creator || type !== 'group') {
      return null;
    }

    return (
      <div className={styles.creator}>
        <Text id="DiscoverCard.creator" />
        <PeerInfoTitle title={creator} className={styles.creatorTitle} emojiSize={18} />
      </div>
    );
  }

  renderIcon() {
    const { type } = this.props;
    const size = 26;

    switch (type) {
      case 'channel':
        return <Icon glyph="channel" className={styles.icon} size={size} />;

      case 'group':
        return <Icon glyph="group" className={styles.icon} size={size} />;

      default:
        return null;
    }
  }

  renderShortname() {
    const { shortname } = this.props;

    if (!shortname) {
      return null;
    }

    return <div className={styles.shortname}>@{shortname}</div>;
  }

  renderInfo() {
    const { title, description } = this.props;

    return (
      <div className={styles.info}>
        <div className={styles.title} title={title}>
          {this.renderIcon()}
          <PeerInfoTitle title={title} emojiSize={24} />
        </div>
        {this.renderShortname()}
        {description ? (
          <div className={styles.description} title={description}>
            <Markdown text={description} inline />
          </div>
        ) : null}
      </div>
    );
  }

  render() {
    const { type, joined } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className} onClick={this.handleClick} id={`discover_card_${this.props.peer.id}`}>
        <div className={styles.body}>
          {this.renderAvatar()}
          {this.renderInfo()}
        </div>
        <footer className={styles.footer}>
          {this.renderMembers()}
          {this.renderCreator()}
          <Button wide theme="primary" rounded={false} className={styles.button}>
            <Text id={`DiscoverCard.${joined ? 'enter' : 'open'}.${type}`} />
          </Button>
        </footer>
      </div>
    );
  }
}

export default DiscoverCard;
