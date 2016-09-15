/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 */

import React, { Component, PropTypes } from 'react';
import TetherComponent from 'react-tether';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from '../SidebarHeader/SidebarHeader.css';

class SidebarHeaderMenu extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.setListener = this.setListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isOpen !== this.state.isOpen ||
           nextProps.children !== this.props.children ||
           nextProps.appName !== this.props.appName;
  }

  handleMenuOpen() {
    this.setState({ isOpen: true });
    this.setListener();
  }

  handleMenuClose() {
    this.setState({ isOpen: false });
    this.removeListener();
  }

  setListener() {
    document.addEventListener('click', this.handleMenuClose);
  }

  removeListener() {
    document.removeEventListener('click', this.handleMenuClose);
  }

  renderToggler() {
    const { appName } = this.props;
    const { isOpen } = this.state;
    const arrowClassName = classNames(styles.arrow, {
      [styles.arrowOpened]: isOpen
    });

    return (
      <a onClick={this.handleMenuOpen} className={styles.menu}>
        {appName} <Icon glyph="arrow_drop_down" className={arrowClassName} />
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
      >
        {this.renderToggler()}
        {this.renderChildren()}
      </TetherComponent>
    );
  }
}

export default SidebarHeaderMenu;
