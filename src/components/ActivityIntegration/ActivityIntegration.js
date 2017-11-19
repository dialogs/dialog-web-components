/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import CopyButton from '../CopyButton/CopyButton';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import styles from '../ActivityInvite/ActivityInvite.css';

export type Props = {
  className?: string,
  link: string,
  pending: boolean,
  onRevoke: () => any
};

class ActivityIntegration extends PureComponent<Props> {
  renderLink() {
    const { link, pending } = this.props;

    if (pending) {
      return <Spinner type="dotted" />;
    }

    return (
      <span className={styles.link}>{link}</span>
    );
  }

  render() {
    const { pending } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.block}>
          <div className={styles.linkContainer}>
            {this.renderLink()}
          </div>
          <CopyButton
            id="activity_integration_copy_button"
            wide
            disabled={pending}
            text={this.props.link}
          />
        </div>
        <hr className={styles.hr} />
        <div className={styles.block}>
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
}

export default ActivityIntegration;
