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
  onRevoke: () => any
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

  render(): React.Element<any> {
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
            wide
            disabled={pending}
            text={this.props.link}
          />
        </div>
        <hr className={styles.hr} />
        <div className={styles.block}>
          <Button
            theme="danger"
            view="link"
            onClick={this.props.onRevoke}
            className={styles.revoke}
            size="small"
          >
            <Text id="ActivityInvite.revoke" />
          </Button>
        </div>
      </div>
    );
  }
}

export default ActivityInvite;
