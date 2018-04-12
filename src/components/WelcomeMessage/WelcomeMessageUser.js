/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import Markdown from '../Markdown/Markdown';
import styles from './WelcomeMessage.css';

export type Props = {
  className?: string,
  title: string,
  userName?: ?string,
  about?: ?string,
  renderActions?: () => Node
};

class WelcomeMessageUser extends PureComponent<Props> {
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

  renderAbout() {
    const { about } = this.props;

    if (!about) {
      return null;
    }

    return <Markdown className={styles.about} text={about} emojiSize={18} />;
  }

  render() {
    const { title, userName } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.user}>
          <PeerInfoTitle
            title={title}
            userName={userName}
            titleClassName={styles.title}
            userNameClassName={styles.subtitle}
            emojiSize={36}
            addSpacebars
          />
          {this.renderAbout()}
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default WelcomeMessageUser;
