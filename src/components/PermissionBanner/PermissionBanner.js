/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './PermissionBanner.css';

export type PermissionType = 'notification' | 'mic' | 'camera';

export type Props = {
  className?: string,
  type: PermissionType,
  onClose: () => mixed,
  onPermissionRequest: () => mixed
};

class PermissionBanner extends PureComponent {
  props: Props;

  handlePermissionRequest = () => {
    this.props.onPermissionRequest();
    this.props.onClose();
  };

  render(): React.Element<any> {
    const className = classNames(styles.container, styles[this.props.type], this.props.className);

    return (
      <div className={className}>
        <Icon glyph="close" className={styles.close} onClick={this.props.onClose} />
        <Text id={`PermissionBanner.text.${this.props.type}`} className={styles.text} tagName="div" html />
        <Text
          id={`PermissionBanner.request.${this.props.type}`}
          className={styles.request}
          tagName="div"
          onClick={this.props.onPermissionRequest}
        />
      </div>
    );
  }
}

export default PermissionBanner;
