/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component, type Node } from 'react';
import Tether from 'react-tether';
import { listen } from '@dlghq/dialog-utils';

export type TriggerHandler = 'onClick' | 'onContextMenu' | 'onDoubleClick' | 'onMouseDown' |
  'onMouseEnter' | 'onMouseLeave' | 'onMouseMove' | 'onMouseUp';

export type Point = {
  x: number,
  y: number
};

export type Props = {

  /**
   * [Tether options](http://tether.io/#options)
   */
  options: Object,

  /**
   * Which events should trigger child mount.
   */
  openHandler: TriggerHandler[],

  /**
   * Which events should trigger child unmount.
   */
  closeHandler: TriggerHandler[],

  /**
   * Prevent default behaviour for open events.
   */
  preventDefault?: boolean,

  /**
   * Close child on document click.
   */
  closeOnDocumentClick: boolean,

  /**
   * Close child on document scroll.
   */
  closeOnDocumentScroll: boolean,

  renderTrigger: (handlers: Object, isActive: boolean) => Node,
  renderChild: (point: Point) => Node,

  /**
   * Called whenever child is mounting or unmounting.
   */
  onChange?: (active: boolean) => void
};

export type State = {
  isOpen: boolean,
  position: Point
};

class Trigger extends Component<Props, State> {
  listeners: ?{ remove(): void }[];

  static defaultProps = {
    closeOnDocumentClick: false,
    closeOnDocumentScroll: false
  };

  constructor(props: Props): void {
    super(props);

    this.state = {
      isOpen: false,
      position: {
        x: 0,
        y: 0
      }
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.isOpen !== this.state.isOpen;
  }

  componentWillUnmount(): void {
    this.removeListeners();
    if (this.props.onChange) {
      this.props.onChange(false);
    }
  }

  handleOpen = (event: $FlowIssue): void => {
    if (this.props.preventDefault) {
      event.preventDefault();
    }

    const x = event.clientX;
    const y = event.clientY;

    this.setState(() => {
      this.removeListeners();

      this.listeners = [];
      if (this.props.closeOnDocumentClick) {
        this.listeners.push(
          listen(document, 'click', this.handleClose, { passive: true })
        );
      }

      if (this.props.closeOnDocumentScroll) {
        this.listeners.push(
          listen(document, 'scroll', this.handleClose, { passive: true })
        );
      }

      if (this.props.onChange) {
        this.props.onChange(true);
      }

      return {
        isOpen: true,
        position: { x, y }
      };
    });
  };

  handleClose = (): void => {
    this.setState(() => {
      this.removeListeners();

      if (this.props.onChange) {
        this.props.onChange(false);
      }

      return {
        isOpen: false,
        position: {
          x: 0,
          y: 0
        }
      };
    });
  };

  removeListeners = (): void => {
    if (this.listeners) {
      this.listeners.forEach((listener) => listener.remove());
      this.listeners = null;
    }
  };

  renderChild() {
    if (this.state.isOpen) {
      return this.props.renderChild(this.state.position);
    }

    return null;
  }

  renderTrigger() {
    const { isOpen } = this.state;
    const handler = isOpen ? this.handleClose : this.handleOpen;
    const activeHandlers = isOpen ? this.props.closeHandler : this.props.openHandler;

    const props = {};
    activeHandlers.forEach((eventName) => {
      props[eventName] = handler;
    });

    return this.props.renderTrigger(props, isOpen);
  }

  render() {
    const { options } = this.props;

    return (
      <Tether {...options}>
        {this.renderTrigger()}
        {this.renderChild()}
      </Tether>
    );
  }
}

export default Trigger;
