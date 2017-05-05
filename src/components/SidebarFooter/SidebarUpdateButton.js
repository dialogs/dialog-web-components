/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Button from '../Button/Button';
import { Text } from '@dlghq/react-l10n';
import styles from './SidebarFooter.css';

export type Props = {
  onClick: () => any
};

class SidebarUpdateButton extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    return (
      <Button className={styles.update} onClick={this.props.onClick} theme="info" rounded={false}>
        <Text id="SidebarFooter.update" />
      </Button>
    );
  }
}

export default SidebarUpdateButton;
