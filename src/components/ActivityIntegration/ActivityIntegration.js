/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import CopyButton from '../CopyButton/CopyButton';
import CopyOnly from '../CopyOnly/CopyOnly';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import styles from '../ActivityInvite/ActivityInvite.css';

export type Props = {
  className?: string,
  link: string,
  pending: boolean,
  onRevoke: () => mixed
};

class ActivityIntegration extends PureComponent<Props> {
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
        <CopyButton id="activity_integration_copy_button" wide disabled={this.props.pending} text={this.props.link} />
        <div className={styles.revokeWrapper}>
          <hr className={styles.hr} />
          <Button
            id="activity_integration_revoke_button"
            theme="danger"
            view="link"
            onClick={this.props.onRevoke}
            size="small"
            className={styles.revoke}
          >
            <Text id="ActivityIntegration.revoke" />
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return <div className={className}>{this.renderContent()}</div>;
  }
}

export default ActivityIntegration;
