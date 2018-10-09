/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node } from 'react';

export const ModalContext = React.createContext({
  modalRoot: null
});

type ModalProviderProps = {
  modalRootId?: string,
  children: Node
};

type ModalProviderState = {
  modalRoot: null | HTMLDivElement
};

export class ModalProvider extends React.PureComponent<ModalProviderProps, ModalProviderState> {
  state = {
    modalRoot: null
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const { modalRootId } = this.props;
      const body = document.querySelector('body');
      if (body) {
        const modalRoot = document.createElement('div');
        if (modalRootId) modalRoot.setAttribute('id', modalRootId);
        body.appendChild(modalRoot);
        this.setState({ modalRoot });
      }
    }
  }

  componentWillUnmount() {
    const body = document.querySelector('body');
    const { modalRoot } = this.state;
    if (body && modalRoot) {
      body.removeChild(modalRoot);
    }
  }

  render() {
    const { children } = this.props;

    return <ModalContext.Provider value={this.state}>{children}</ModalContext.Provider>;
  }
}
