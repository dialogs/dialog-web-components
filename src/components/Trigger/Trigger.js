/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import TetherComponent from 'react-tether';
import { listen } from '@dlghq/dialog-utils';

export type TriggerHandler = 'onClick' | 'onContextMenu' | 'onDoubleClick' | 'onMouseDown' |
  'onMouseEnter' | 'onMouseLeave' | 'onMouseMove' | 'onMouseUp';

export type Point = {
  x: number,
  y: number
};

export type Props = {
  renderChild: (point: Point) => React.Element<any>,
  children: React.Element<any>,
  openHandler: TriggerHandler[],
  closeHandler: TriggerHandler[],
  closeOnDocumentClick: boolean,
  closeOnDocumentScroll: boolean,
  preventDefault?: boolean,
  openDelay: number,
  closeDelay: number,
  options: any
};

export type State = {
  isOpen: boolean,
  position: Point
};

class Trigger extends PureComponent {
  props: Props;
  state: State;
  listeners: ?{ remove(): void }[];

  static defaultProps = {
    closeOnDocumentClick: false,
    closeOnDocumentScroll: false,
    openDelay: 0,
    closeDelay: 0
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

  componentWillUnmount(): void {
    this.removeListener();
  }

  handleOpen = (event: $FlowIssue): void => {
    if (this.props.preventDefault) {
      event.preventDefault();
    }

    this.setState({
      position: {
        x: event.clientX,
        y: event.clientY
      }
    });

    setTimeout(() => {
      this.setState({ isOpen: true });
      this.setListener();
    }, this.props.openDelay);
  };

  handleClose = (): void => {
    setTimeout(() => {
      this.setState({ isOpen: false });
      this.removeListener();
    }, this.props.closeDelay);
  };

  handleDocumentClick = (): void => {
    if (this.props.closeOnDocumentClick) {
      this.handleClose();
    }
  };

  handleDocumentScroll = (): void => {
    if (this.props.closeOnDocumentScroll) {
      this.handleClose();
    }
  };

  setListener = (): void => {
    this.listeners = [
      listen(document, 'click', this.handleDocumentClick, { passive: true }),
      listen(document, 'scroll', this.handleDocumentScroll, { passive: true })
    ];
  };

  removeListener = (): void => {
    if (this.listeners) {
      this.listeners.forEach((listener) => listener.remove());
      this.listeners = null;
    }
  };

  renderChild(): ?React.Element<any> {
    const { isOpen, position } = this.state;

    if (!isOpen) {
      return null;
    }

    return this.props.renderChild(position);
  }

  renderTrigger(): React.Element<any> {
    const { openHandler, closeHandler } = this.props;
    const { isOpen } = this.state;
    const newProps = {
      active: isOpen
    };
    const handlers = isOpen ? closeHandler : openHandler;

    handlers.forEach((handler) => {
      Object.assign(newProps, { [handler]: isOpen ? this.handleClose : this.handleOpen });
    });

    // Wrap children with span if it string
    if (typeof this.props.children === 'string') {
      return (
        <span {...newProps}>{this.props.children}</span>
      );
    }

    return React.cloneElement(this.props.children, {...this.props.children.props, ...newProps});
  }

  render(): React.Element<any> {
    const { options } = this.props;

    return (
      <TetherComponent {...options}>
        {this.renderTrigger()}
        {this.renderChild()}
      </TetherComponent>
    );
  }
}

export default Trigger;
