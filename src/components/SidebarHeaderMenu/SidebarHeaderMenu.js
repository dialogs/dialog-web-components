/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { Component } from 'react';
import TetherComponent from 'react-tether';
import Icon from '../Icon/Icon';
import styles from '../SidebarHeader/SidebarHeader.css';

export type SidebarHeaderMenuProps = {
  appName: string,
  logo: React.Element<any>,
  children?: any
};
export type SidebarHeaderMenuState = {
  isOpen: boolean
}

class SidebarHeaderMenu extends Component {
  props: SidebarHeaderMenuProps;
  state: SidebarHeaderMenuState;

  handleMenuOpen: EventHandler;
  handleMenuClose: EventHandler;
  setListener: () => void;
  removeListener: () => void;

  constructor(props: SidebarHeaderMenuProps) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.setListener = this.setListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
  }

  shouldComponentUpdate(nextProps: SidebarHeaderMenuProps, nextState: SidebarHeaderMenuState) {
    return nextState.isOpen !== this.state.isOpen ||
           nextProps.logo !== this.props.logo ||
           nextProps.children !== this.props.children ||
           nextProps.appName !== this.props.appName;
  }

  handleMenuOpen(): void {
    this.setState({ isOpen: true });
    this.setListener();
  }

  handleMenuClose(): void {
    this.setState({ isOpen: false });
    this.removeListener();
  }

  setListener(): void {
    document.addEventListener('click', this.handleMenuClose);
  }

  removeListener(): void {
    document.removeEventListener('click', this.handleMenuClose);
  }

  renderLogo() {
    const { logo } = this.props;

    if (!logo) {
      return null;
    }

    return (
      <div className={styles.logo}>{logo}</div>
    );
  }

  renderToggler() {
    const { appName } = this.props;
    const { isOpen } = this.state;
    const arrowGlyph = isOpen ? 'arrow_drop_up' : 'arrow_drop_down';

    return (
      <a onClick={this.handleMenuOpen} className={styles.menu}>
        {this.renderLogo()}
        <div className={styles.appName}>{appName}</div>
        <Icon glyph={arrowGlyph} className={styles.arrow} />
      </a>
    );
  }

  renderChildren() {
    const { children } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return children;
  }

  render() {
    return (
      <TetherComponent
        attachment="top left"
        targetAttachment="bottom left"
        constraints={[{ to: 'scrollParent', attachment: 'together' }]}
        offset="-10px -24px"
      >
        {this.renderToggler()}
        {this.renderChildren()}
      </TetherComponent>
    );
  }
}

export default SidebarHeaderMenu;
