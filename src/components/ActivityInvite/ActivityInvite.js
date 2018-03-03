/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import CopyButton from '../CopyButton/CopyButton';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import CopyOnly from '../CopyOnly/CopyOnly';
import styles from './ActivityInvite.css';

export type Props = {
  className?: string,
  link: string,
  pending: boolean,
  onRevoke: ?() => mixed
};

class ActivityInvite extends PureComponent<Props> {
  renderRevoke() {
    if (!this.props.onRevoke) {
      return null;
    }

    return (
      <div>
        <hr className={styles.hr} />
        <Button
          theme="danger"
          view="link"
          onClick={this.props.onRevoke}
          className={styles.revoke}
          size="small"
          id="activity_invite_revoke_button"
        >
          <Text id="ActivityInvite.revoke" />
        </Button>
      </div>
    );
  }

  renderContent() {
    if (this.props.pending) {
      return (
        <div className={styles.pending}>
          <Spinner type="dotted" size="normal" />
        </div>
      );
    }

    return (
      <div className={styles.block}>
        <div className={styles.linkContainer}>
          <span className={styles.link}>{this.props.link}</span>
        </div>
        <CopyOnly block />
        <CopyButton id="activity_invite_copy_button" wide disabled={this.props.pending} text={this.props.link} />
        {this.renderRevoke()}
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return <div className={className}>{this.renderContent()}</div>;
  }
}

export default ActivityInvite;
