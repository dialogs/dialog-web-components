/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component, type Node } from 'react';
import { listen, hasSelection } from '@dlghq/dialog-utils';

export type Props = {
  className?: string,
  id?: string,
  children?: Node,
  onHover: (hover: boolean) => mixed,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
};

class Hover extends Component<Props> {
  hover: boolean;
  selecting: boolean;
  listener: ?{ remove(): void };

  constructor(props: Props) {
    super(props);

    this.hover = false;
    this.selecting = false;
  }

  componentDidMount(): void {
    this.listener = listen(
      document,
      'selectionchange',
      this.handleSelectionChange,
      { passive: true },
    );
  }

  componentWillUnmount(): void {
    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }
  }

  handleSelectionChange = (): void => {
    if (hasSelection()) {
      this.selecting = true;
      this.props.onHover(false);
    } else {
      this.selecting = false;
      this.props.onHover(this.hover);
    }
  };

  handleMouseEnter = (): void => {
    this.hover = true;
    if (!this.selecting) {
      this.props.onHover(true);
    }
  };

  handleMouseLeave = (): void => {
    this.hover = false;
    if (!this.selecting) {
      this.props.onHover(false);
    }
  };

  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Hover;
