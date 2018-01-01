/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';

export type Props = {
  children: Node,
  index: number,
  style: { [key: string]: string },
  onHover: (index: number) => void,
  onSelect: (index: number) => void
};

class SelectRow extends PureComponent<Props> {
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
