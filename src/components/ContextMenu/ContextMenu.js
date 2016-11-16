/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import React, { PureComponent } from 'react';
import styles from './ContextMenu.css';
import Trigger from '../Trigger/Trigger';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';

class ContextMenu extends PureComponent {
  props: Props;
  renderMenu: Function;

  constructor(props: Props): void {
    super(props);

    this.renderMenu = this.renderMenu.bind(this);
  }

  renderMenuItems() {
    return this.props.menu.map((menuItem, index) => {
      const { title, handler } = menuItem;

      return (
        <DropdownItem onClick={handler} key={index}>{title}</DropdownItem>
      );
    });
  }

  renderMenu(position: Object): React.Element<any> {
    return (
      <Dropdown
        isOpen
        className={styles.container}
        style={{ left: window.pageXOffset + position.x, top: window.pageYOffset + position.y }}
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
