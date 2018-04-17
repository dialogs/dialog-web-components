/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Button from '../Button/Button';
import { Text } from '@dlghq/react-l10n';
import styles from './SidebarFooter.css';

export type Props = {
  onClick: () => mixed
};

class SidebarUpdateButton extends PureComponent<Props> {
  render() {
    return (
      <Button
        className={styles.update}
        onClick={this.props.onClick}
        theme="info"
        rounded={false}
        id="sidebar_footer_update_button"
      >
        <Text id="SidebarFooter.update" />
      </Button>
    );
  }
}

export default SidebarUpdateButton;
