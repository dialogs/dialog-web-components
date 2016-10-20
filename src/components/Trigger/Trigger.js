/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import TetherComponent from 'react-tether';

export type TriggerHandler =
  'onClick' | 'onContextMenu' | 'onDoubleClick' | 'onMouseDown' |
  'onMouseEnter' | 'onMouseLeave' | 'onMouseMove' | 'onMouseUp';

export type Props = {
  renderChild: () => React.Element<any>,
  children?: React.Element<any>,
  openHandler: TriggerHandler[],
  closeHandler: TriggerHandler[],
  closeOnDocumentClick: boolean,
  closeOnDocumentScroll: boolean,
  // openDelay?: number,
  // closeDelay?: number,
  options: any
};

export type State = {
  isOpen: boolean
};

class Trigger extends Component {
  props: Props;
  state: State;

  handleOpen: Function;
  handleClose: Function;
  setListener: Function;
  removeListener: Function;

  static defaultProps = {
    closeOnDocumentClick: false,
    closeOnDocumentScroll: false
  };

  constructor(props: Props): void {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setListener = this.setListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return nextState.isOpen !== this.state.isOpen ||
           nextProps.renderChild !== this.props.renderChild ||
           nextProps.children !== this.props.children ||
           nextProps.openHandler !== this.props.openHandler ||
           nextProps.closeHandler !== this.props.closeHandler ||
           nextProps.closeOnDocumentClick !== this.props.closeOnDocumentClick ||
           nextProps.closeOnDocumentScroll !== this.props.closeOnDocumentScroll ||
           nextProps.options !== this.props.options;
  }

  handleOpen(): void {
    this.setState({ isOpen: true });
    this.setListener();
  }

  handleClose(): void {
    this.setState({ isOpen: false });
    this.removeListener();
  }

  setListener(): void {
    const { closeOnDocumentClick, closeOnDocumentScroll } = this.props;

    if (closeOnDocumentClick) {
      document.addEventListener('click', this.handleClose);
    }

    if (closeOnDocumentScroll) {
      document.addEventListener('scroll', this.handleClose);
    }
  }

  removeListener(): void {
    const { closeOnDocumentClick, closeOnDocumentScroll } = this.props;

    if (closeOnDocumentClick) {
      document.removeEventListener('click', this.handleClose);
    }

    if (closeOnDocumentScroll) {
      document.removeEventListener('scroll', this.handleClose);
    }
  }

  renderChild(): ?React.Element<any> {
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return this.props.renderChild();
  }

  renderTrigger(): React.Element<any> {
    const { openHandler, closeHandler } = this.props;
    const { isOpen } = this.state;
    const newProps = {};
    const handlers = isOpen ? closeHandler : openHandler;

    handlers.forEach((handler) => {
      Object.assign(newProps, { [handler]: isOpen ? this.handleClose : this.handleOpen });
    });

    return (
      <span {...newProps}>{this.props.children}</span>
    );
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
