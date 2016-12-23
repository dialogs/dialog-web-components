/**
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './SidebarFooter.css';

export type Props = {
  className?: string,
  renderButtons: () => React.Element<any>
};

class SidebarFooter extends PureComponent {
  props: Props;

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.props.renderButtons()}
      </div>
    );
  }
}

export default SidebarFooter;
