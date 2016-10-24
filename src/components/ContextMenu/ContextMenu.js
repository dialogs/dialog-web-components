/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import React, { Component } from 'react';
import styles from './ContextMenu.css';
import Trigger from '../Trigger/Trigger';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../DropdownItem/DropdownItem';

class ContextMenu extends Component {
  props: Props;
  renderMenu: Function;

  constructor(props: Props): void {
    super(props);

    this.renderMenu = this.renderMenu.bind(this);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.menu !== this.props.menu ||
           nextProps.children !== this.props.children ||
           nextProps.className !== this.props.className;
  }

  renderMenuItems() {
    return this.props.menu.map((menuItem, index) => {
      const { title, handler } = menuItem;

      return (
        <DropdownItem onClick={handler} key={index}>{title}</DropdownItem>
      );
    });
  }

  renderMenu(position: any): React.Element<any> {
    return (
      <Dropdown
        isOpen
        className={styles.container}
        style={{ left: position.x, top: position.y }}
      >
        {this.renderMenuItems()}
      </Dropdown>
    );
  }

  render(): React.Element<any> {
    const options = {
      attachment: 'top left',
      targetAttachment: 'top left',
      target: document.body,
      constraints: [{
        to: 'window',
        attachment: 'together'
      }]
    };

    return (
      <Trigger
        openHandler={['onContextMenu']}
        closeHandler={['onClick']}
        closeOnDocumentClick
        preventDefault
        renderChild={this.renderMenu}
        options={options}
      >
        {this.props.children}
      </Trigger>
    );
  }
}

export default ContextMenu;
