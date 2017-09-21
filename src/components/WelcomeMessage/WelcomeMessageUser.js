/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import styles from './WelcomeMessage.css';

export type Props = {
  className?: string,
  title: string,
  userName?: ?string,
  about?: ?string,
  renderActions?: () => mixed
};

class WelcomeMessageUser extends PureComponent {
  props: Props;

  renderActions() {
    if (!this.props.renderActions) {
      return null;
    }

    return <div className={styles.actions}>{this.props.renderActions()}</div>;
  }

  renderAbout() {
    const { about } = this.props;

    if (!about) {
      return null;
    }

    return (
      <div className={styles.about}>
        {about}
      </div>
    );
  }

  render(): React.Element<any> {
    const { title, userName } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.user}>
          <Text id="WelcomeMessage.user.hint" className={styles.hintText} tagName="div" />
          <PeerInfoTitle
            title={title}
            userName={userName}
            titleClassName={styles.title}
            userNameClassName={styles.subtitle}
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
