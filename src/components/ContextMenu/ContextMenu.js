/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props } from './types';
import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import styles from './ContextMenu.css';
import Trigger from '../Trigger/Trigger';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';

export type Context = ProviderContext;

class ContextMenu extends PureComponent {
  props: Props;
  context: Context;

  static contextTypes = {
    l10n: LocalizationContextType
  };

  renderMenuItems() {
    const items = this.props.getMenu();

    return items.map(({ title, handler }, index) => {
      return (
        <DropdownItem key={index} onClick={handler}>
          {this.context.l10n.formatText(title)}
        </DropdownItem>
      );
    });
  }

  renderMenu = (position: Object) => {
    return (
      <Dropdown
        className={styles.container}
        style={{ left: window.pageXOffset + position.x, top: window.pageYOffset + position.y }}
      >
        {this.renderMenuItems()}
      </Dropdown>
    );
  };

  renderTrigger = (newProps: Object) => {
    return (
      <span {...newProps}>{this.props.children}</span>
    );
  };

  render() {
    const options = {
      attachment: 'top left',
      targetAttachment: 'top left',
      target: document.body,
      constraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ]
    };

    return (
      <Trigger
        openHandler={['onContextMenu']}
        closeHandler={['onClick']}
        closeOnDocumentClick
        preventDefault
        renderTrigger={this.renderTrigger}
        renderChild={this.renderMenu}
        options={options}
      />
    );
  }
}

export default ContextMenu;
