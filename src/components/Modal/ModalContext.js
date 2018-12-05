/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { type Node, type Context } from 'react';

type ModalProviderProps = {
  modalRootId?: string,
  children: Node,
};

type ModalProviderState = {
  modalRoot: null | HTMLDivElement,
};

export const ModalContext: Context<ModalProviderState> = React.createContext({
  modalRoot: null,
});

export class ModalProvider extends React.PureComponent<
  ModalProviderProps,
  ModalProviderState,
> {
  state = {
    modalRoot: null,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const { modalRootId } = this.props;
      const body = document.body;
      if (body) {
        const modalRoot = document.createElement('div');
        if (modalRootId) {
          modalRoot.setAttribute('id', modalRootId);
        }
        body.appendChild(modalRoot);
        this.setState({ modalRoot });
      }
    }
  }

  componentWillUnmount() {
    const { modalRoot } = this.state;
    if (modalRoot && modalRoot.parentNode) {
      modalRoot.parentNode.removeChild(modalRoot);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <ModalContext.Provider value={this.state}>
        {children}
      </ModalContext.Provider>
    );
  }
}
