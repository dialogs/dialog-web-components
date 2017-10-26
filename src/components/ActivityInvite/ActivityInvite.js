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
import CopyOnly from '../CopyOnly/CopyOnly';
import styles from './ActivityInvite.css';

export type Props = {
  className?: string,
  link: string,
  pending: boolean,
  onRevoke: ?() => any
};

class ActivityInvite extends PureComponent {
  props: Props;

  renderLink(): React.Element<any> {
    const { link, pending } = this.props;

    if (pending) {
      return <Spinner type="dotted" />;
    }

    return (
      <span className={styles.link}>{link}</span>
    );
  }

  renderRevoke() {
    if (!this.props.onRevoke) {
      return null;
    }

    return (
      <div>
        <hr className={styles.hr} />
        <div className={styles.block}>
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
      </div>
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
          <CopyOnly block />
          <CopyButton
            id="activity_invite_copy_button"
            wide
            disabled={pending}
            text={this.props.link}
          />
        </div>
        {this.renderRevoke()}
      </div>
    );
  }
}

export default ActivityInvite;
