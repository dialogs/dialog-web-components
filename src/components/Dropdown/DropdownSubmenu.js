/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import Hover from '../Hover/Hover';
import styles from './Dropdown.css';

export type Props = {
  children: Node,
  title: string,
  id?: string,
  className?: string
};

type State = {
  hover: boolean
};

class DropdownSubmenu extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  handleHover = (hover: boolean) => {
    this.setState({ hover });
  };

  renderSubmenu() {
    if (!this.state.hover) {
      return null;
    }

    return <div className={styles.submenuWrapper}>{this.props.children}</div>;
  }

  render() {
    const className = classNames(
      styles.submenu,
      this.props.className,
      styles.hoverable,
      this.state.hover ? styles.active : null
    );

    return (
      <Hover className={className} id={this.props.id} onHover={this.handleHover}>
        <div className={styles.wrapper}>
          <span className={styles.text}>{this.props.title}</span>
          {this.renderSubmenu()}
        </div>
      </Hover>
    );
  }
}

export default DropdownSubmenu;
