/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import styles from './WelcomeMessage.css';

export type Props = {
  className?: string,
  title: string,
  about?: string,
  creator?: ?string,
  createdAt?: ?string,
  renderActions?: () => mixed
};

class WelcomeMessageGroup extends PureComponent {
  props: Props;

  renderCreated() {
    const { createdAt, creator } = this.props;

    if (createdAt && creator) {
      return (
        <Text
          id="WelcomeMessage.group.created"
          className={styles.subtitle}
          values={{ createdAt, creator }}
        />
      );
    }

    return null;
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

  renderActions() {
    if (!this.props.renderActions) {
      return null;
    }

    return <div className={styles.actions}>{this.props.renderActions()}</div>;
  }

  render(): React.Element<any> {
    const { title } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.group}>
          <div className={styles.hint}>
            <Text id="WelcomeMessage.group.hint" className={styles.hintText} tagName="div" />
          </div>
          <h1 className={styles.title}>{title}</h1>
          {this.renderCreated()}
          {this.renderAbout()}
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default WelcomeMessageGroup;
