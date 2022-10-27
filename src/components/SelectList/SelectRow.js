/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';

export type Props = {
  children?: React.Element<any>,
  index: number,
  style: { [key: string]: string },
  onHover: (index: number) => void,
  onSelect: (index: number) => void
};

class SelectRow extends PureComponent {
  props: Props;

  handleClick = (): void => {
    this.props.onSelect(this.props.index);
  };

  handleMouseEnter = (): void => {
    this.props.onHover(this.props.index);
  };

  render() {
    return (
      <div
        style={this.props.style}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
      >
        {this.props.children}
      </div>
    );
  }
}

export default SelectRow;
