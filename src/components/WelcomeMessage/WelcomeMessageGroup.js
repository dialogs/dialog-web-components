/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import { Text } from '@dlghq/react-l10n';
import Markdown from '../Markdown/Markdown';
import styles from './WelcomeMessage.css';

export type Props = {
  className?: string,
  title: string,
  isAdmin?: ?boolean,
  isOwner?: ?boolean,
  about?: string,
  creator?: ?string,
  createdAt?: ?string,
  renderActions?: () => Node
};

class WelcomeMessageGroup extends PureComponent<Props> {
  renderCreatedAt() {
    const { createdAt } = this.props;

    if (!createdAt) {
      return null;
    }

    return (
      <span className={styles.createdDate}>
        {createdAt}
      </span>
    );
  }

  renderCreated() {
    const { creator, isOwner } = this.props;

    if (isOwner) {
      return (
        <div className={styles.created}>
          <Text id="WelcomeMessage.group.created_by_you" className={styles.createdText} />
          {this.renderCreatedAt()}
        </div>
      );
    }

    if (creator) {
      return (
        <div className={styles.created}>
          <Text id="WelcomeMessage.group.created" className={styles.createdText} />
          <PeerInfoTitle title={creator} emojiSize={18} />
          {this.renderCreatedAt()}
        </div>
      );
    }

    return null;
  }

  renderAbout() {
    const { about } = this.props;

    if (!about) {
      return null;
    }

    return <Markdown className={styles.about} text={about} emojiSize={18} />;
  }

  renderActions() {
    if (!this.props.renderActions) {
      return null;
    }

    return (
      <div className={styles.actions}>
        {this.props.renderActions()}
      </div>
    );
  }

  renderHint() {
    const { isAdmin } = this.props;

    if (!isAdmin) {
      return null;
    }

    return (
      <div className={styles.hint}>
        <Text id="WelcomeMessage.group.hint" className={styles.hintText} tagName="div" />
      </div>
    );
  }
  render() {
    const { title } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.group}>
          {this.renderHint()}
          <PeerInfoTitle title={title} titleClassName={styles.title} emojiSize={36} />
          {this.renderCreated()}
          {this.renderAbout()}
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default WelcomeMessageGroup;
