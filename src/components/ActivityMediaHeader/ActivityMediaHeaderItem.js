/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import DropdownItem from '../Dropdown/DropdownItem';

export type Props = {
  onClick: (type: string) => mixed,
  type: string,
  id?: string
};

class ActivityMediaHeaderItem extends PureComponent {
  props: Props;

  handleClick = () => {
    this.props.onClick(this.props.type);
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
