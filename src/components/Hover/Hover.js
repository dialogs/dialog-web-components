/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import { listen } from '@dlghq/dialog-utils';

export type Props = {
  className?: string,
  children?: React.Element<any>,
  onHover: (hover: boolean) => void
};

class Hover extends Component {
  props: Props;
  hover: boolean;
  selecting: boolean;
  listeners: ?Array<{ remove(): void }>;

  constructor(props: Props) {
    super(props);

    this.hover = false;
    this.selecting = false;
  }

  componentDidMount() {
    this.listeners = [
      listen(document, 'selectionchange', this.handleSelectionChange, { passive: true })
    ];
  }

  componentWillUnmount() {
    if (this.listeners) {
      this.listeners.forEach((listener) => listener.remove());
      this.listeners = null;
    }
  }

  handleSelectionChange = (event) => {
    const selection = document.getSelection();
    if (selection && selection.toString()) {
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
