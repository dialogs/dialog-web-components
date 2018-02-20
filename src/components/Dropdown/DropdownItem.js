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
  id?: string,
  className?: string,
  wrapperClassName?: string,
  active?: ?boolean,
  onClick?: (event: SyntheticMouseEvent<>) => mixed,
  renderSubmenu?: () => Node
};

type State = {
  hover: boolean
};

class DropdownItem extends PureComponent<Props, State> {
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
    if (!this.state.hover || !this.props.renderSubmenu) {
      return null;
    }

    return <div className={styles.submenuWrapper}>{this.props.renderSubmenu()}</div>;
  }

  renderClickableItem() {
    const className = classNames(styles.item, this.props.className, {
      [styles.active]: this.state.hover || this.props.active,
      [styles.clickable]: this.props.onClick
    });
    const wrapperClassName = classNames(styles.wrapper, this.props.wrapperClassName);

    return (
      <Hover className={className} id={this.props.id} onHover={this.handleHover} onClick={this.props.onClick}>
        <div className={wrapperClassName}>
          <div className={styles.content}>{this.props.children}</div>
          {this.renderSubmenu()}
        </div>
      </Hover>
    );
  }

  renderDefaultItem() {
    const className = classNames(styles.item, this.props.className, {
      [styles.active]: this.props.active
    });
    const wrapperClassName = classNames(styles.wrapper, this.props.wrapperClassName);

    return (
      <div className={className} id={this.props.id}>
        <div className={wrapperClassName}>
          <div className={styles.content}>{this.props.children}</div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.onClick || this.props.renderSubmenu) {
      return this.renderClickableItem();
    }

    return this.renderDefaultItem();
  }
}

export default DropdownItem;
