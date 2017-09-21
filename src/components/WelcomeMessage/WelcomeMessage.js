/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './WelcomeMessage.css';

export type Props = {
  className?: string,
  info: PeerInfo,
  createdAt: ?string,
  creator: ?string,
  renderActions?: () => mixed
};

class WelcomeMessage extends PureComponent {
  props: Props;

  renderGroupMessage() {
    const { info, createdAt, creator } = this.props;

    return (
      <div className={styles.group}>
        <div className={styles.hint}>
          <Text id="WelcomeMessage.group.hint" className={styles.hintText} />
        </div>
        <h1 className={styles.title}>{info.title}</h1>
        {
          createdAt && creator ? (
            <Text
              id="WelcomeMessage.group.created"
              className={styles.subtitle}
              values={{ createdAt, creator }}
            />
          ) : null
        }
      </div>
    );
  }

  renderUserMessage() {
    const { info } = this.props;

    return (
      <div className={styles.user}>
        <h1 className={styles.title}>{info.title}</h1>
        <p className={styles.subtitle}>@{info.userName}</p>
      </div>
    );
  }

  renderContent() {
    if (this.props.info.type === 'group') {
      return this.renderGroupMessage();
    }

    return this.renderUserMessage();
  }

  renderActions() {
    if (!this.props.renderActions) {
      return null;
    }

    return <div className={styles.actions}>{this.props.renderActions()}</div>;
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderContent()}
        {this.renderActions()}
      </div>
    );
  }
}

export default WelcomeMessage;
