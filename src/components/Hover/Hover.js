/**
 * Copyright 2016 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';

export type Props = {
  className?: string,
  children?: React.Element<any>,
  onHover: (hover: boolean) => void
};

class Hover extends Component {
  props: Props;

  handleMouseEnter = (): void => {
    this.props.onHover(true);
  };

  handleMouseLeave = (): void => {
    this.props.onHover(false);
  };

  render() {
    return (
      <div
        className={this.props.className}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Hover;
