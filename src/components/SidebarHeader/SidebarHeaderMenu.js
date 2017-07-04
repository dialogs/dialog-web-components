/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Trigger from '../Trigger/Trigger';
import Icon from '../Icon/Icon';
import styles from './SidebarHeader.css';

export type Props = {
  appName: string,
  logo: React.Element<any>,
  renderMenu: () => React.Element<any>
};

class SidebarHeaderMenu extends PureComponent {
  props: Props;

  renderLogo(): ?React.Element<any> {
    const { logo } = this.props;

    if (!logo) {
      return null;
    }

    return (
      <div className={styles.logo}>{logo}</div>
    );
  }

  renderTrigger = (handlers: Object, isActive: boolean): React.Element<any> => {
    const { appName } = this.props;

    return (
      <a className={styles.menu} {...handlers}>
        {this.renderLogo()}
        <div className={styles.appName}>{appName}</div>
        <Icon glyph={isActive ? 'arrow_drop_up' : 'arrow_drop_down'} className={styles.arrow} size={30} />
      </a>
    );
  };

  render(): React.Element<any> {
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
