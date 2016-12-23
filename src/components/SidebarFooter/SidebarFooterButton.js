/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './SidebarFooter.css';

export type Props = {
  className?: string,
  glyph: string,
  active: boolean,
  onClick: () => any,
};

class SidebarFooterButton extends PureComponent {
  props: Props;

  handleClick = (): void => {
    const { active } = this.props;

    if (!active) {
      console.debug('handleClick');
      this.props.onClick();
    }
  };

  render(): React.Element<any> {
    const { glyph, active } = this.props;
    const className = classNames(styles.button, {
      [styles.active]: active
    }, this.props.className);

    return (
      <div className={className} onClick={this.handleClick}>
        <Icon glyph={glyph} className={styles.icon} />
      </div>
    );
  }
}

export default SidebarFooterButton;
