/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import Trigger from '../Trigger/Trigger';
import Icon from '../Icon/Icon';
import styles from './SidebarHeader.css';

export type Props = {
  appName: string,
  logo: Node,
  renderMenu: () => Node
};

class SidebarHeaderMenu extends PureComponent<Props> {
  renderLogo() {
    const { logo } = this.props;

    if (!logo) {
      return null;
    }

    return <div className={styles.logo}>{logo}</div>;
  }

  renderTrigger = (handlers: Object, isActive: boolean) => {
    const { appName } = this.props;

    return (
      <a className={styles.menu} {...handlers} id="sidebar_header_menu">
        {this.renderLogo()}
        <div className={styles.appName}>{appName}</div>
        <Icon glyph={isActive ? 'arrow_drop_up' : 'arrow_drop_down'} className={styles.arrow} size={28} />
      </a>
    );
  };

  render() {
    const options = {
      attachment: 'top left',
      targetAttachment: 'bottom left',
      constraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ],
      targetOffset: '0px 23px'
    };

    return (
      <Trigger
        options={options}
        renderTrigger={this.renderTrigger}
        renderChild={this.props.renderMenu}
        openHandler={['onClick']}
        closeHandler={['onClick']}
        closeOnDocumentClick
        closeOnDocumentScroll
      />
    );
  }
}

export default SidebarHeaderMenu;
