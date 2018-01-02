/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import DropdownItem from '../Dropdown/DropdownItem';

export type Props = {
  id?: string,
  type: string,
  onClick?: (type: string) => mixed
};

class ActivityMediaHeaderItem extends PureComponent<Props> {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.type);
    }
  };

  render() {
    return (
      <DropdownItem onClick={this.handleClick} id={this.props.id}>
        <Text id={`ActivityMediaHeader.${this.props.type}`} />
      </DropdownItem>
    );
  }
}

export default ActivityMediaHeaderItem;
