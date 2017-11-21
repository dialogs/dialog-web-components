/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import Trigger from '../Trigger/Trigger';
import Icon from '../Icon/Icon';
import styles from './SidebarHeader.css';

export type Props = {
  className?: string,
  renderMenu: () => Node
};

class SidebarHeaderPlus extends PureComponent<Props> {
  renderTrigger = (handlers: Object, isActive: boolean) => {
    const plusClassName = classNames(styles.plus, {
      [styles.plusActive]: isActive
    }, this.props.className);

    return (
      <Icon
        glyph="plus_outline"
        className={plusClassName}
        size={28}
        id="sidebar_header_plus_menu"
        {...handlers}
      />
    );
  };

  render() {
    const options = {
      attachment: 'top center',
      targetAttachment: 'bottom center',
      constraints: [
        {
          to: 'scrollParent',
          attachment: 'together',
          pin: true
        }
      ],
      targetOffset: '0 0'
    };

    return (
      <div className={styles.plusWrapper}>
        <Trigger
          options={options}
          renderTrigger={this.renderTrigger}
          renderChild={this.props.renderMenu}
          openHandler={['onClick']}
          closeHandler={['onClick']}
          closeOnDocumentClick
          closeOnDocumentScroll
        />
      </div>
    );
  }
}

export default SidebarHeaderPlus;
